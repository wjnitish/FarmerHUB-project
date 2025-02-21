import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (image) formData.append("image", image);
    if (text) formData.append("text", text);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(`Response: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Failed to send data.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Harvest HUB</h1>
      </div>
      <h2>Upload Image or Enter Text</h2>
      <div className="form-container">
        <input type="file" onChange={handleImageChange} className="file-input" />
        <textarea
          placeholder="Enter text here..."
          value={text}
          onChange={handleTextChange}
          className="text-box"
        />
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;