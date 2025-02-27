import React, { useEffect, useState } from "react";

import "./homepage.css";

const Homepage = () => {
  const [memes, setMemes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch trending memes from API
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setMemes(data.data.memes.slice(0, 6))) // Show top 6 memes
      .catch((error) => console.error("Error fetching memes:", error));
  }, []);

  return (
    <div className={`homepage ${darkMode ? "dark" : ""}`}>
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1 className="title">Welcome to MemeVerse</h1>
      <p className="subtitle">Explore and upload memes!</p>

      <div className="meme-container">
        {memes.map((meme) => (
          <div key={meme.id} className="meme-card">
            <img src={meme.url} alt={meme.name} className="meme-img" />
            <p className="meme-name">{meme.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
