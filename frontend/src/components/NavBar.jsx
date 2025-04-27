// frontend/src/components/Navbar.jsx

import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav
      style={{
        padding: "1rem",
        background: "#eee",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Link to="/notes" style={{ marginRight: "1rem" }}>
          Notes
        </Link>
        {!isLoggedIn && (
          <>
            <Link to="/login" style={{ marginRight: "1rem" }}>
              Login
            </Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;
