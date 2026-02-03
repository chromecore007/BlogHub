import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import "../styles/blogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);

  const token = sessionStorage.getItem("token");
  const loggedUser = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `https://bloghub-e2gd.onrender.com/api/blog/${id}`
        );
        setBlog(res.data.blog);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(
        `https://bloghub-e2gd.onrender.com/api/blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (!blog) {
    return <p className="blog-loading">Loading...</p>;
  }

  return (
    <div className="blog-detail-container">
      {/* IMAGE */}
      {blog.image && (
        <img
          src={blog.image}
          alt="blog"
          className="blog-detail-image"
        />
      )}

      {/* HEADER */}
      <div className="blog-header">
        <h1>{blog.title}</h1>

        <div className="blog-meta">
          <span className="blog-author">
            ✍️ {blog.author?.name}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="blog-content">
        <p>{blog.content}</p>
      </div>

      {/* ACTIONS */}
      {token && loggedUser?.id === blog.author?._id && (
        <div className="blog-actions">
          <Link to={`/edit/${id}`} className="edit-btn">
            Edit
          </Link>

          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}

      {/* COMMENTS */}
      <CommentSection blogId={id} />
    </div>
  );
};

export default BlogDetail;
