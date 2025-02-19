import React, { useState } from "react";
import axios from "axios";

const CreateBlogPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("photo", image);  // Use "photo" as the field name
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/blogs/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Show success message
      setMessage("Blog post created successfully!");
    } catch (error) {
      console.error("Error creating blog post:", error);
      setMessage("Failed to create blog post.");
    }
  };
  

  return (
    <div>
      <h2>Create a New Blog Post</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Upload Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Create Blog Post</button>
      </form>
    </div>
  );
};

export default CreateBlogPost;
