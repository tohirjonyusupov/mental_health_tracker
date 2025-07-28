const pool = require("../../../config/db");

exports.createJournal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Sarlavha va matn talab qilinadi" });
    }

    const result = await pool.query(
      "INSERT INTO journal_logs (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
      [userId, title, content]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};