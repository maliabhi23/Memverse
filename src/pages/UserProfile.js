
import React, { useState, useEffect } from "react";

const UserProfile = () => {
  // State for user info
  const [user, setUser] = useState({
    name: "John Doe",
    bio: "Meme Enthusiast 😂",
    profilePic: "https://via.placeholder.com/150", // Default profile picture
  });

  // State for memes (uploaded & liked)
  const [uploadedMemes, setUploadedMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);

  // Fetch uploaded & liked memes from localStorage or API
  useEffect(() => {
    const storedUploads = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    const storedLikes = JSON.parse(localStorage.getItem("likedMemes")) || [];
    setUploadedMemes(storedUploads);
    setLikedMemes(storedLikes);
  }, []);

  // Handle Profile Edit
  const handleEditProfile = () => {
    const newName = prompt("Enter your name:", user.name);
    const newBio = prompt("Enter your bio:", user.bio);
    if (newName && newBio) {
      setUser({ ...user, name: newName, bio: newBio });
    }
  };

  return (
    <div className="profile-container">
      {/* Profile Section */}
      <div className="profile-info">
        <img src={user.profilePic} alt="Profile" className="profile-pic" />
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
        <h1 className="edit-profile" onClick={handleEditProfile} >Edit Profile</h1>
      </div>

      {/* Uploaded Memes Section */}
      <h3>Uploaded Memes</h3>
      <div className="meme-grid">
        {uploadedMemes.length > 0 ? (
          uploadedMemes.map((meme, index) => (
            <img key={index} src={meme.url} alt="Uploaded Meme" />
          ))
        ) : (
          <p>No uploaded memes yet.</p>
        )}
      </div>

      {/* Liked Memes Section */}
      <h3>Liked Memes</h3>
      <div className="meme-grid">
        {likedMemes.length > 0 ? (
          likedMemes.map((meme, index) => (
            <img key={index} src={meme.url} alt="Liked Meme" />
          ))
        ) : (
          <p>No liked memes yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
