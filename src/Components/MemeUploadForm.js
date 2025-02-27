import React, { useState } from "react";
import axios from "axios";

const MemeUploadForm = ({ onUpload }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // ✅ Replace with correct Cloud Name
  const CLOUD_NAME = "dlyuaqura"; 
  const UPLOAD_PRESET = "your_upload_preset"; // Replace with actual preset

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    setUploading(true);

    // ✅ Prepare form data
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET); // Required for unsigned uploads

    try {
      // ✅ Send to Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      // ✅ Get uploaded image URL
      const uploadedImageUrl = response.data.secure_url;

      console.log("Cloudinary Response:", response.data);

      onUpload({ imageUrl: uploadedImageUrl, caption });

      alert("Meme uploaded successfully!");
      setPreview(null);
      setImage(null);
      setCaption("");
    } catch (error) {
      console.error("Upload failed:", error.response ? error.response.data : error.message);
      alert("Failed to upload meme.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload a Meme</h2>
      {preview && <img src={preview} alt="Preview" style={{ maxWidth: "300px" }} />}
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <input
        type="text"
        placeholder="Enter a caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Meme"}
      </button>
    </div>
  );
};

export default MemeUploadForm;
