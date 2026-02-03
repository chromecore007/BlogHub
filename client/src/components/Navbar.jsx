import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="nav-wrapper">
      <div className="nav-container">

        {/* LEFT: LOGO */}
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            Blog<span>Hub</span>
          </Link>
        </div>

        {/* CENTER: LINKS */}
        <nav className="nav-center">
          <Link to="/">Home</Link>
          {user && <Link to="/create">Write</Link>}
        </nav>

        {/* RIGHT: USER ACTIONS */}
        <div className="nav-right">
          {user ? (
            <>
              <span className="nav-user">
                👋 {user.name}
              </span>
              <button className="nav-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
