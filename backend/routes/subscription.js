const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const supabase = require('../config/database-temp');

// Subscribe to plan
router.post('/subscribe', authMiddleware, async (req, res) => {
  try {
    const { plan } = req.body;

    if (!plan || !['monthly', 'yearly'].includes(plan)) {
      return res.status(400).json({ error: 'Invalid plan. Must be monthly or yearly' });
    }

    // Calculate expiry date
    const expiryDate = new Date();
    if (plan === 'monthly') {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }

    // Update user subscription
    const { data: user, error } = await supabase
      .from('users')
      .update({
        is_subscribed: true,
        plan,
        expiry_date: expiryDate.toISOString()
      })
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      message: 'Subscription successful',
      user: {
        id: user.id,
        is_subscribed: user.is_subscribed,
        plan: user.plan,
        expiry_date: user.expiry_date
      }
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Check subscription status
router.get('/status', authMiddleware, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('is_subscribed, plan, expiry_date')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if subscription has expired
    const now = new Date();
    const expiryDate = new Date(user.expiry_date);
    const isExpired = user.expiry_date && now > expiryDate;

    if (isExpired && user.is_subscribed) {
      // Update subscription status in database
      await supabase
        .from('users')
        .update({
          is_subscribed: false,
          plan: null,
          expiry_date: null
        })
        .eq('id', req.user.id);

      user.is_subscribed = false;
      user.plan = null;
      user.expiry_date = null;
    }

    res.json({
      is_subscribed: user.is_subscribed,
      plan: user.plan,
      expiry_date: user.expiry_date,
      is_expired: isExpired
    });
  } catch (error) {
    console.error('Subscription status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Cancel subscription
router.post('/cancel', authMiddleware, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .update({
        is_subscribed: false,
        plan: null,
        expiry_date: null
      })
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      message: 'Subscription cancelled successfully',
      user: {
        id: user.id,
        is_subscribed: user.is_subscribed,
        plan: user.plan,
        expiry_date: user.expiry_date
      }
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
