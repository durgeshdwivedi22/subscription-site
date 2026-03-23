const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const supabase = require('../config/database-temp');

// Run draw (admin only)
router.post('/run-draw', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // Generate 5 random numbers between 1-45
    const drawNumbers = [];
    while (drawNumbers.length < 5) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!drawNumbers.includes(num)) {
        drawNumbers.push(num);
      }
    }

    // Sort numbers for consistency
    drawNumbers.sort((a, b) => a - b);

    // Create draw record
    const { data: draw, error: drawError } = await supabase
      .from('draws')
      .insert([{
        numbers: drawNumbers
      }])
      .select()
      .single();

    if (drawError) throw drawError;

    // Get all subscribed users with their scores
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, name, email')
      .eq('is_subscribed', true);

    if (usersError) throw usersError;

    // Process each user's scores
    const results = [];
    for (const user of users) {
      // Get user's scores
      const { data: scores, error: scoresError } = await supabase
        .from('scores')
        .select('score')
        .eq('user_id', user.id);

      if (scoresError) continue;

      if (scores && scores.length > 0) {
        // Count matches
        const userNumbers = scores.map(s => s.score);
        let matchCount = 0;
        
        for (const drawNum of drawNumbers) {
          if (userNumbers.includes(drawNum)) {
            matchCount++;
          }
        }

        // Determine prize type
        let prizeType = 'none';
        if (matchCount === 5) prizeType = 'jackpot';
        else if (matchCount === 4) prizeType = 'medium';
        else if (matchCount === 3) prizeType = 'small';

        // Store result
        const { data: result, error: resultError } = await supabase
          .from('results')
          .insert([{
            user_id: user.id,
            draw_id: draw.id,
            match_count: matchCount,
            prize_type: prizeType
          }])
          .select()
          .single();

        if (resultError) continue;

        results.push({
          user: user,
          match_count: matchCount,
          prize_type: prizeType
        });
      }
    }

    res.json({
      message: 'Draw completed successfully',
      draw: {
        id: draw.id,
        numbers: draw.numbers,
        date: draw.date
      },
      results: results
    });
  } catch (error) {
    console.error('Run draw error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get draw results
router.get('/results', authMiddleware, async (req, res) => {
  try {
    const { data: results, error } = await supabase
      .from('results')
      .select(`
        *,
        draws (
          id,
          numbers,
          date
        )
      `)
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ results });
  } catch (error) {
    console.error('Get results error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all draws (admin only)
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { data: draws, error } = await supabase
      .from('draws')
      .select(`
        *,
        results (
          user_id,
          match_count,
          prize_type,
          users (
            name,
            email
          )
        )
      `)
      .order('date', { ascending: false });

    if (error) throw error;

    res.json({ draws });
  } catch (error) {
    console.error('Get all draws error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get charities
router.get('/charities', async (req, res) => {
  try {
    const { data: charities, error } = await supabase
      .from('charities')
      .select('*')
      .order('name');

    if (error) throw error;

    res.json({ charities });
  } catch (error) {
    console.error('Get charities error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
