import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;


export default function App() {
  const moods = ["happy", "sad", "calm", "energetic", "focus"];
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState("");

  const fetchSongs = async (mood) => {
    setLoading(true);
    setSongs([]);
    try {
      const response = await axios.get("https://ws.audioscrobbler.com/2.0/", {
        params: {
          method: "track.search",
          track: mood,
          api_key: API_KEY,
          format: "json",
          limit: 17,
        },
      });
      const tracks = response.data.results.trackmatches.track || [];
      setSongs(tracks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-600 transform transition duration-300 hover:scale-110  ">🎵 MoodWave</h1>

      <div className="flex justify-center gap-4 mb-6">
        {moods.map((m) => (
          <button
            key={m}
            onClick={() => {
              fetchSongs(m);        // fetch songs for this mood
              setSelectedMood(m);   // set this mood as selected
            }}
            className={`px-4 py-2 rounded text-white transition-colors duration-300
              ${selectedMood === m ? "bg-green-600" : "bg-blue-600 hover:bg-green-600"}`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded shadow ">
        {songs.map((song) => (
          <div key={song.name + song.artist} className="bg-gray-800 p-4 rounded shadow">
            <h2 className="font-semibold text-gray-600">{song.name}</h2>
            <p className="text-white transform transition duration-300 hover:scale-140">{song.artist}</p>
            <a
              href={song.url}
              target="_blank"
              className="text-blue-600 hover:underline hover:text-green-500 "
            >
              Listen on Last.fm
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
