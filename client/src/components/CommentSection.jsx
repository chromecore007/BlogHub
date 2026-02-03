import { useEffect, useState } from "react";
import axios from "axios";

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const token = sessionStorage.getItem("token");

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `https://bloghub-e2gd.onrender.com/api/comment/${blogId}`
      );

      // 🔐 SAFETY: ensure array
      setComments(Array.isArray(res.data.comments) ? res.data.comments : []);
    } catch (err) {
      console.log(err);
      setComments([]);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Login to comment");
      return;
    }

    try {
      await axios.post(
        `https://bloghub-e2gd.onrender.com/api/comment/${blogId}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setText("");
      fetchComments();
    } catch (err) {
      alert("Failed to add comment");
    }
  };

  return (
    <div className="comment-box" style={{ marginTop: "30px" }}>
      <h3>Comments</h3>

      {comments.length === 0 && (
        <p style={{ color: "#64748b" }}>No comments yet</p>
      )}

      {comments.map((c) => (
        <div key={c._id} style={{ marginBottom: "10px" }}>
          {/* 🔥 SAFE ACCESS */}
          <b>{c.user?.name || "Anonymous"}</b>
          <p>{c.text}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          rows="3"
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
