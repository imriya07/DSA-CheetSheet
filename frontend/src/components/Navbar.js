import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
      <div className="container">
        {isLoggedIn && (
          <Link to="/" className="navbar-brand fw-bold explore">
            Dashboard
          </Link>
        )}

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto d-flex flex-row align-items-center">
            {isLoggedIn ? (
              <>
                <li className="nav-item me-3 explore">
                  <Link to="/profile" className="nav-link" onClick={() => setIsCollapsed(true)}>
                    Profile
                  </Link>
                </li>
                <li className="nav-item me-3 explore">
                  <Link to="/topics" className="nav-link" onClick={() => setIsCollapsed(true)}>
                    Topics
                  </Link>
                </li>
                <li className="nav-item me-3 explore">
                  <Link to="/progress" className="nav-link" onClick={() => setIsCollapsed(true)}>
                    Progress
                  </Link>
                </li>
                <li className="nav-item explore">
                  <button
                    className="btn btn-danger logout-btn"
                    onClick={() => {
                      handleLogout();
                      setIsCollapsed(true);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2 explore">
                  <Link to="/login" className="btn btn-success" onClick={() => setIsCollapsed(true)}>
                    Login
                  </Link>
                </li>
                <li className="nav-item explore">
                  <Link to="/signup" className="btn btn-primary" onClick={() => setIsCollapsed(true)}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
