import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import UserProfile from "../pages/UserProfile";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme === "true") {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      localStorage.setItem("darkMode", !prevMode);
      return !prevMode;
    });
  };

  return (
    <nav className={`navbar ${darkMode ? "dark" : ""}`}>
      <div className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link to="/explore" className={location.pathname === "/explore" ? "active" : ""}>
          Explore
        </Link>
        <Link to="/upload" className={location.pathname === "/upload" ? "active" : ""}>
          Upload
        </Link>
        <Link to="/leaderboard" className={location.pathname === "/leaderboard" ? "active" : ""}>
          Leaderboard
        </Link>
        <Link to="/Userprofile" className={location.pathname === "/profile" ? "active" : ""}>
          Profile
        </Link>
      </div>

      {/* <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button> */}
    </nav>
  );
};

export default Navbar;
