import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/editBlog.css";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ SAFE FETCH
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `https://bloghub-e2gd.onrender.com/api/blog/${id}`
        );

        const blog = res.data.blog;

        // 🔥 IMPORTANT FIX
        setForm({
          title: blog?.title || "",
          description: blog?.description || "",
          content: blog?.content || "",
        });

        if (blog?.image) {
          setPreview(blog.image);
        }
      } catch (err) {
        console.log(err);
        alert("Failed to load blog");
      }
    };

    fetchBlog();
  }, [id]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("content", form.content);
    if (image) formData.append("image", image);

    try {
      await axios.put(
        `https://bloghub-e2gd.onrender.com/api/blog/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate(`/blog/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit Your Story ✏️</h2>

      <form onSubmit={handleUpdate} className="edit-form">
        <input
          name="title"
          placeholder="Blog title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Short description"
          rows="2"
          maxLength={160}
          value={form.description}
          onChange={handleChange}
        />
        <small>{form.description.length}/160</small>

        <textarea
          name="content"
          placeholder="Edit your story..."
          rows="8"
          value={form.content}
          onChange={handleChange}
          required
        />

        <label className="image-upload">
          Change cover image
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

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Blog 💾"}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
