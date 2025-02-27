import React, { useEffect, useState, useRef, useCallback } from "react";
import "./MemeExplorer.css";

const MemeExplorer = () => {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("date");
  const [filterCategory, setFilterCategory] = useState("Trending");
  const [page, setPage] = useState(1);
  const observer = useRef();

  // Debounced search
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const searchResults = memes.filter((meme) =>
        meme.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMemes(searchResults);
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [searchQuery, memes]);

  // Fetch memes
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMemes(data.data.memes);
          setFilteredMemes(data.data.memes.slice(0, page * 10)); // Initial load
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching memes:", error);
        setLoading(false);
      });
  }, []);

  // Infinite scrolling
  const lastMemeRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  // Load more memes on scroll
  useEffect(() => {
    setFilteredMemes(memes.slice(0, page * 10));
  }, [page, memes]);

  // Sorting logic
  const sortedMemes = [...filteredMemes].sort((a, b) => {
    if (sortType === "likes") return b.captions - a.captions;
    if (sortType === "date") return a.id.localeCompare(b.id);
    return 0;
  });

  return (
    <div className="meme-container">
      <h1 className="title">Meme Explorer</h1>

      {/* Search Bar */}
      <input
        type="text"
        className="search-box"
        placeholder="Search memes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Filters */}
      <div className="filters">
      
        <select onChange={(e) => setFilterCategory(e.target.value)}>
          <option>Trending</option>
          <option>New</option>
          <option>Classic</option>
          <option>Random</option>
        </select>

        {/* Sorting */}
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="likes">Sort by Likes</option>
        </select>
      </div>

      {loading ? (
        <p className="loading-text">Loading memes...</p>
      ) : (
        <div className="meme-grid">
          {sortedMemes.map((meme, index) => (
            <div
              key={meme.id}
              className="meme-card"
              ref={index === sortedMemes.length - 1 ? lastMemeRef : null}
            >
              <img src={meme.url} alt={meme.name} className="meme-image" />
              <p className="meme-name">{meme.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemeExplorer;
