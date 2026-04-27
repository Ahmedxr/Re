const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// يخدم ملفات الـ HTML من نفس المشروع
app.use(express.static(__dirname));

const API_KEY = process.env.API_KEY; // حطه في Replit أو Render Secrets

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "أنت مساعد عائلي لطيف وتجاوب باللهجة العراقية أحياناً." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content || "صار خطأ بالرد";

    res.json({ reply });

  } catch (err) {
    res.json({ reply: "خطأ بالسيرفر" });
  }
});

// مهم للنشر على الإنترنت
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
