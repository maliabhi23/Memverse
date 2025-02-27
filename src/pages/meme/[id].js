
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import axios from "axios";

export default function MemeDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    if (id) fetchMemeDetails();
  }, [id]);

  const fetchMemeDetails = async () => {
    try {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      const memeData = response.data.data.memes.find((m) => m.id === id);
      setMeme(memeData);
    } catch (error) {
      console.error("Error fetching meme:", error);
    }
  };

  if (!meme) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <img src={meme.url} alt={meme.name} className="w-full rounded-lg shadow-lg" />
        <h2 className="text-3xl font-bold mt-4">{meme.name}</h2>
      </div>
    </div>
  );
}
