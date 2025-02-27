import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";


export default function HomePage() {
  const [memes, setMemes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      setMemes(response.data.data.memes.slice(0, 10)); // Fetch top 10 memes
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
      <Navbar toggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />

      <motion.h2
        className="text-4xl font-bold text-center mt-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Trending Memes 🔥
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
        {memes.map((meme) => (
          <motion.div
            key={meme.id}
            className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <img src={meme.url} alt={meme.name} className="w-full h-60 object-cover rounded-lg" />
            <h3 className="text-lg font-semibold mt-2">{meme.name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
