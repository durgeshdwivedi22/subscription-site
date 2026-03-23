const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const supabase = require('../config/database-temp');

// Add score
router.post('/add-score', authMiddleware, async (req, res) => {
  try {
    const { score, date } = req.body;

    // Validation
    if (!score || !date) {
      return res.status(400).json({ error: 'Score and date are required' });
    }

    if (score < 1 || score > 45) {
      return res.status(400).json({ error: 'Score must be between 1 and 45' });
    }

    // Check if user is subscribed
    const { data: user } = await supabase
      .from('users')
      .select('is_subscribed')
      .eq('id', req.user.id)
      .single();

    if (!user?.is_subscribed) {
      return res.status(403).json({ error: 'Subscription required to add scores' });
    }

    // Get current scores count
    const { data: existingScores, error: countError } = await supabase
      .from('scores')
      .select('id, date')
      .eq('user_id', req.user.id)
      .order('date', { ascending: false });

    if (countError) throw countError;

    // If user has 5 scores, remove the oldest one
    if (existingScores && existingScores.length >= 5) {
      const oldestScore = existingScores[existingScores.length - 1];
      const { error: deleteError } = await supabase
        .from('scores')
        .delete()
        .eq('id', oldestScore.id);

      if (deleteError) throw deleteError;
    }

    // Add new score
    const { data: newScore, error } = await supabase
      .from('scores')
      .insert([{
        user_id: req.user.id,
        score,
        date
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      message: 'Score added successfully',
      score: newScore
    });
  } catch (error) {
    console.error('Add score error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user scores
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { data: scores, error } = await supabase
      .from('scores')
      .select('*')
      .eq('user_id', req.user.id)
      .order('date', { ascending: false })
      .limit(5);

    if (error) throw error;

    res.json({ scores });
  } catch (error) {
    console.error('Get scores error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete score
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // First check if score belongs to user
    const { data: score, error: fetchError } = await supabase
      .from('scores')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !score) {
      return res.status(404).json({ error: 'Score not found' });
    }

    if (score.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Delete score
    const { error } = await supabase
      .from('scores')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Score deleted successfully' });
  } catch (error) {
    console.error('Delete score error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
