const pool = require("../../config/db");

exports.getRandomMotivation = async (req, res) => {
  const { lang } = req.query; // masalan: ?lang=uz

  try {
    // Lang parametrini tekshirish
    if(lang && typeof lang !== 'string') {
      return res.status(400).json({ message: "Invalid language parameter" });
    }
    const result = await pool.query(
      `SELECT * FROM motivations WHERE lang = $1 ORDER BY RANDOM() LIMIT 1`,
      [lang || "uz"] // default til 'uz'
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Motivation not found for this language" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
