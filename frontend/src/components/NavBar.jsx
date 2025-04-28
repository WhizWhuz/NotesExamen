import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/NavBar.module.scss";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className={styles.navBar}>
      <div className={styles.leftLinks}>
        <Link to="/notes">Notes</Link>
        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
      {isLoggedIn && (
        <div className={styles.logoutBtn}>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
