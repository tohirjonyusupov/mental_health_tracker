const pool = require("../../config/db");

exports.getAllMoods = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      "SELECT * FROM mood_entries WHERE user_id = $1 ORDER BY date DESC",
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(200).json({ message: "No mood entries found" });
    }
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
