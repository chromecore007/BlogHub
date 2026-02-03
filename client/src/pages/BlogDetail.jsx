import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import "../styles/blogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");
  const loggedUser = JSON.parse(sessionStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `https://bloghub-e2gd.onrender.com/api/blog/${id}`
        );
        setBlog(res.data.blog);
      } catch (err) {
        // 🔥 HANDLE 404 / DELETED BLOG
        if (err.response?.status === 404) {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  if (loading) {
    return <p className="blog-loading">Loading blog...</p>;
  }

  if (!blog) {
    return <p className="blog-loading">Blog not found</p>;
  }

  return (
    <div className="blog-detail-container">
      {/* IMAGE */}
      {blog.image && (
        <img src={blog.image} alt="blog" className="blog-detail-image" />
      )}

      {/* HEADER */}
      <div className="blog-header">
        <h1>{blog.title || "Untitled"}</h1>

        <div className="blog-meta">
          <span className="blog-author">
            ✍️ {blog.author?.name || "Unknown"}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="blog-content">
        <p>{blog.content || ""}</p>
      </div>

      {/* ACTIONS (ONLY OWNER) */}
      {token &&
        loggedUser &&
        blog.author &&
        loggedUser.id === blog.author._id && (
          <div className="blog-actions">
            <Link to={`/edit/${id}`} className="edit-btn">
              Edit
            </Link>

            <button
              className="delete-btn"
              onClick={async () => {
                if (!window.confirm("Delete this blog?")) return;
                await axios.delete(
                  `https://bloghub-e2gd.onrender.com/api/blog/${id}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                navigate("/");
              }}
            >
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
