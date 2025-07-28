const pool = require("../../../config/db");

exports.getJournalById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM journal_logs WHERE id = $1 AND user_id = $2",
      [id, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Topilmadi" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};