import { useEffect, useState } from "react";
import axios from "axios";

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const token = sessionStorage.getItem("token");

  const fetchComments = async () => {
    const res = await axios.get(
      `https://bloghub-e2gd.onrender.com/api/comment/${blogId}`
    );
    setComments(res.data.comments);
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
  };

  return (
    <div className="comment-box" style={{ marginTop: "30px" }}>
      <h3>Comments</h3>

      {comments.map((c) => (
        <div key={c._id} style={{ marginBottom: "10px" }}>
          <b>{c.user.name}</b>
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
