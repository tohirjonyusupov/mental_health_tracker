const pool = require("../../config/db");

exports.deleteMood = async (req, res) => {
  const userId = req.user.id;
  const moodId = req.params.id;

  try {
    // faqat o‘zining moodini o‘chirsin
    const result = await pool.query(
      `DELETE FROM mood_entries 
       WHERE id = $1 AND user_id = $2 
       RETURNING *`,
      [moodId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Mood entry not found or not yours' });
    }

    res.status(200).json({ message: 'Mood entry deleted', deleted: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};