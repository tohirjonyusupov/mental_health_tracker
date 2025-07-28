const pool = require("../../config/db");

exports.createMotivation = async (req, res) => {
  const { text, category, lang } = req.body;

  if (!text || !lang) {
    return res.status(400).json({ error: "Text and lang are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO motivations (text, category, lang) VALUES ($1, $2, $3) RETURNING *`,
      [text, category || null, lang]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
