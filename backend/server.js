
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("DEV@Deakin newsletter backend is running!");
});

app.post("/api/newsletter/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address."
      });
    }

    const apiKey = process.env.MAILGUN_API_KEY;
    const domain = process.env.MAILGUN_DOMAIN;

    if (!apiKey || !domain) {
      return res.status(500).json({
        success: false,
        message: "Mailgun credentials are missing."
      });
    }

    const formData = new FormData();

    formData.append(
      "from",
      `DEV@Deakin Newsletter <postmaster@${domain}>`
    );
    formData.append("to", email.trim());
    formData.append("subject", "Welcome to DEV@Deakin!");
    formData.append(
      "html",
      "<h2>Thanks for subscribing!</h2><p>Welcome to our newsletter.</p>"
    );

    const credentials = Buffer.from(`api:${apiKey}`).toString("base64");

    const response = await fetch(
      `https://api.mailgun.net/v3/${domain}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`
        },
        body: formData
      }
    );

    const result = await response.json();

    console.log("Mailgun API status:", response.status);
    console.log("Mailgun API response:", result);

    if (!response.ok) {
      return res.status(502).json({
        success: false,
        message: result.message || "Mailgun could not send the email."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your subscription email has been accepted by Mailgun!"
    });

  } catch (error) {
    console.error("Newsletter error:", error.message);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred."
    });
  }
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
