import { useState } from "react";
import Navbar from "../Components/Navbar";

export default function UploadPage() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <div className="p-6 flex flex-col items-center">
        <input type="file" onChange={handleImageUpload} className="mb-4" />
        {image && <img src={image} alt="Preview" className="w-80 h-auto rounded-lg" />}
        <textarea
          placeholder="Add a funny caption..."
          className="w-80 p-2 border rounded-lg mt-4"
          onChange={(e) => setCaption(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Upload Meme</button>
      </div>
    </div>
  );
}
