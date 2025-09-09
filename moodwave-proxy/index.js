const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// ✅ Allow only your deployed frontend in production
app.use(
  cors({
    origin: ["https://moodwave-1.onrender.com"], // change if your frontend URL is different
    methods: ["GET"],
  })
);

// ✅ Use Render’s dynamic port
const PORT = process.env.PORT || 3001;

// ✅ Load API key from env
const API_KEY = process.env.LASTFM_API_KEY;

// endpoint to get tracks for a mood
app.get("/search", async (req, res) => {
  const mood = req.query.q;
  if (!mood) return res.status(400).json({ error: "Missing q" });

  try {
    const response = await axios.get("https://ws.audioscrobbler.com/2.0/", {
      params: {
        method: "track.search",
        track: mood,
        api_key: API_KEY,
        format: "json",
        limit: 10,
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch tracks" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy running on port ${PORT}`);
});
