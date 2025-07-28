const pool = require('../../config/db');

exports.createMood = async (req, res) => {
  const userId = req.user.id;
  const { date, mood_level, reason} = req.body;

  if (!date || !mood_level) {
    return res.status(400).json({ message: 'Date and mood level are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO mood_entries (user_id, date, mood_level, reason)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, date, mood_level, reason || null]
    );

    res.status(201).json({
      message: 'Mood entry created',
      mood: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
