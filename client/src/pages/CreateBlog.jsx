import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/createBlog.css";

const CreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("content", form.content);
    if (image) formData.append("image", image);

    try {
      await axios.post(
        "https://bloghub-e2gd.onrender.com/api/blog/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-container">
      <h2>Create a New Story ✍️</h2>

      <form onSubmit={handleSubmit} className="create-form">
        {/* TITLE */}
        <input
          name="title"
          placeholder="Blog title"
          value={form.title}
          onChange={handleChange}
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Short description"
          rows="2"
          maxLength={160}
          value={form.description}
          onChange={handleChange}
        />
        <small>{form.description.length}/160</small>

        {/* CONTENT */}
        <textarea
          name="content"
          placeholder="Write your story here..."
          rows="8"
          value={form.content}
          onChange={handleChange}
          required
        />

        {/* IMAGE UPLOAD */}
        <label className="image-upload">
          Upload cover image
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            hidden
          />
        </label>

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="image-preview"
          />
        )}

        {/* SUBMIT */}
        <button type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish Blog 🚀"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
