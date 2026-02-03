import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/blog/all?search=${search}&page=${page}`
      );
      setBlogs(res.data.blogs);
      setPages(res.data.pages);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [search, page]);

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="home-hero">
        <h1>
          Discover <span>Stories</span>, Ideas & Knowledge
        </h1>
        <p>
          Read and share thoughts from developers, students and creators.
        </p>

        <input
          className="home-search"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </section>

      {/* BLOG LIST */}
      <section className="home-blogs">
        {loading && <p className="home-info">Loading blogs...</p>}

        {!loading && blogs.length === 0 && (
          <p className="home-info">No blogs found 😕</p>
        )}

        {blogs.map((blog) => (
          <div key={blog._id} className="home-blog-card">
            {blog.image && (
              <img src={blog.image} alt="blog" />
            )}

            <div className="home-blog-content">
              <h2>{blog.title}</h2>
              <p className="home-desc">{blog.description}</p>

              <div className="home-blog-footer">
                <span className="home-author">
                  ✍️ {blog.author?.name || "Unknown"}
                </span>

                <Link to={`/blog/${blog._id}`} className="read-btn">
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* PAGINATION */}
      {pages > 1 && (
        <div className="home-pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ← Prev
          </button>

          <span>
            Page {page} of {pages}
          </span>

          <button
            disabled={page === pages}
            onClick={() => setPage(page + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
