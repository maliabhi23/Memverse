import React, { useEffect, useState } from "react";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch leaderboard data (dummy data for now)
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedMemes")) || [];

    // Count likes for each meme
    const memeLikes = storedLikes.reduce((acc, meme) => {
      acc[meme.id] = (acc[meme.id] || 0) + 1;
      return acc;
    }, {});

    // Sort memes by likes (descending) and get top 10
    const sortedMemes = Object.keys(memeLikes)
      .map((id) => ({
        id,
        url: storedLikes.find((meme) => meme.id === id)?.url,
        name: storedLikes.find((meme) => meme.id === id)?.name,
        likes: memeLikes[id],
      }))
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 10);

    setLeaderboard(sortedMemes);
  }, []);

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard 🏆</h1>
      {leaderboard.length > 0 ? (
        <ul>
          {leaderboard.map((meme, index) => (
            <li key={meme.id} className="leaderboard-item">
              <span className="rank">#{index + 1}</span>
              <img src={meme.url} alt={meme.name} className="meme-image" />
              <span className="likes">{meme.likes} ❤️</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No ranked memes yet. Like some memes to see rankings!</p>
      )}
    </div>
  );
};

export default Leaderboard;
