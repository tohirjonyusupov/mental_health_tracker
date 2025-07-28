const pool = require("../../../config/db");

exports.getMoodLastWeek = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT date, mood_level FROM mood_entries
       WHERE user_id = $1
         AND date >= CURRENT_DATE - INTERVAL '7 days'
       ORDER BY date ASC`,
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};