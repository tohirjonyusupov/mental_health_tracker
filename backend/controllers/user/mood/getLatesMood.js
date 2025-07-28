const pool = require("../../config/db");

exports.getLatestMood = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT * FROM mood_entries 
       WHERE user_id = $1 
       ORDER BY date DESC 
       LIMIT 1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No mood entries found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};