import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

export default function ExplorePage() {
  const [memes, setMemes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      setMemes(response.data.data.memes);
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <div className="p-6">
        <input
          type="text"
          placeholder="Search memes..."
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {memes
            .filter((meme) => meme.name.toLowerCase().includes(search.toLowerCase()))
            .map((meme) => (
              <div key={meme.id} className="p-4 border rounded-lg shadow-lg">
                <img src={meme.url} alt={meme.name} className="w-full h-60 object-cover rounded-lg" />
                <h3 className="text-lg font-semibold mt-2">{meme.name}</h3>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
