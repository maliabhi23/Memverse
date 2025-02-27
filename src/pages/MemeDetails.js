import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MemeDetails.css";

const MemeDetails = () => {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch meme details
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const foundMeme = data.data.memes.find((m) => m.id === id);
          setMeme(foundMeme);
          setLikes(localStorage.getItem(`meme_likes_${id}`) || 0);
          setComments(JSON.parse(localStorage.getItem(`meme_comments_${id}`)) || []);
        }
      });
  }, [id]);

  // Handle Like Button
  const handleLike = () => {
    const newLikes = parseInt(likes) + 1;
    setLikes(newLikes);
    localStorage.setItem(`meme_likes_${id}`, newLikes);
  };

  // Handle Comment Submission
  const handleCommentSubmit = () => {
    if (newComment.trim() === "") return;
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`meme_comments_${id}`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  if (!meme) return <p className="loading-text">Loading meme details...</p>;

  return (
    <div className="meme-details-container">
      <h2>{meme.name}</h2>
      <img src={meme.url} alt={meme.name} className="meme-image" />
      
      <div className="meme-actions">
        <button className="like-button" onClick={handleLike}>❤️ {likes} Likes</button>
        <button className="share-button" onClick={() => navigator.clipboard.writeText(window.location.href)}>
          📢 Share
        </button>
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        {comments.length === 0 ? <p>No comments yet. Be the first!</p> : (
          comments.map((comment, index) => (
            <p key={index} className="comment">{comment}</p>
          ))
        )}
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Post</button>
      </div>
    </div>
  );
};

export default MemeDetails;
