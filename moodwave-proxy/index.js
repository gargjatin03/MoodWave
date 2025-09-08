const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 3001;

const API_KEY = "0cbd45728631444f2562b0a17b1610e6";

// endpoint to get tracks for a mood
app.get("/search", async (req, res) => {
  const mood = req.query.q;
  if (!mood) return res.status(400).json({ error: "Missing q" });

  try {
    const response = await axios.get("http://ws.audioscrobbler.com/2.0/", {
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
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Proxy running at http://localhost:${PORT}`));
