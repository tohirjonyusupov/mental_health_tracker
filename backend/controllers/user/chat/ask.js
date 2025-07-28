const axios = require('axios');
const pool = require("../../../config/db");

exports.ask = async (req, res) => {
  const userId = req.user.id;
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: 'Xabar bo‘sh bo‘lishi mumkin emas' });

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: 'Siz foydalanuvchiga hissiy va motivatsion maslahat beruvchi do‘stona yordamchisiz.' },
          { role: 'user', content: message }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = response.data.choices[0].message.content;

    // DB ga yozish
    await pool.query(
      'INSERT INTO chat_logs (user_id, message, reply) VALUES ($1, $2, $3)',
      [userId, message, aiResponse]
    );

    res.json({ response: aiResponse });

  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: 'AI javob bera olmadi' });
  }
};
