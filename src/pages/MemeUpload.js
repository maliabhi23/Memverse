import React from "react";
import MemeUploadForm from "../Components/MemeUploadForm";

const MemeUpload = () => {
  const handleUpload = (meme) => {
    console.log("Uploaded Meme:", meme);
  };

  return (
    <div className="meme-upload-page">
      <h1>Upload a Meme</h1>
      <MemeUploadForm onUpload={handleUpload} />
    </div>
  );
};

export default MemeUpload;
