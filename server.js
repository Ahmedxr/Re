// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }]
      })
    });
    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch(err) {
    res.status(500).json({ reply: "❌ فشل الاتصال بالذكاء الاصطناعي!" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
