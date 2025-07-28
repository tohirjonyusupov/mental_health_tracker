const pool = require("../../../config/db");

exports.deleteJournal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM journal_logs WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Topilmadi yoki ruxsat yo'q" });
    }

    res.json({ message: "O‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};