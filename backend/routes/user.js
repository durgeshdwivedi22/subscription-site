const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const supabase = require('../config/database-temp');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select(`
        id, name, email, is_subscribed, plan, expiry_date, 
        charity, contribution_percentage, role, created_at
      `)
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, charity, contribution_percentage } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (charity !== undefined) updateData.charity = charity;
    if (contribution_percentage !== undefined) {
      if (contribution_percentage < 0 || contribution_percentage > 100) {
        return res.status(400).json({ error: 'Contribution percentage must be between 0 and 100' });
      }
      updateData.contribution_percentage = contribution_percentage;
    }

    const { data: user, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { data: users, error } = await supabase
      .from('users')
      .select(`
        id, name, email, is_subscribed, plan, expiry_date, 
        charity, contribution_percentage, role, created_at
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ users });
  } catch (error) {
    console.error('Users list error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
