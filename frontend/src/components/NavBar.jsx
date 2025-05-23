import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/NavBar.module.scss";
import { useState } from "react";
import LoginPage from "./LoginPage";
import profile from "../assets/svgs/person.svg";

function Navbar({ isLoggedIn, setIsLoggedIn, user }) {
  const navigate = useNavigate();

  const [isOpened, setIsOpened] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // 🥷 reflect logout in UI
    navigate("/");
  };

  return (
    <nav className={styles.navBar}>
      <div className={styles.leftLinks}>
        <Link to="/">Home</Link>
        <Link to="/notes">Create Note</Link>

        {!isLoggedIn && (
          <>
            <p
              style={{
                fontWeight: 500,
                color: "#646cff",
                textDecoration: "inherit",
                cursor: "pointer",
              }}
              onClick={() => setIsOpened((prev) => !prev)}
            >
              Login
            </p>
          </>
        )}
        <div
          className={styles.loginPopup}
          style={{
            opacity: isOpened ? 1 : 0,
            transform: isOpened ? "scale(1)" : "scale(0.95)",
            pointerEvents: isOpened ? "auto" : "none",
          }}
        >
          <LoginPage setIsOpened={setIsOpened} setIsLoggedIn={setIsLoggedIn} />
          <p className={styles.links}>
            Don't have an account?
            <Link
              style={{ color: "lightblue" }}
              to="/register"
              onClick={() => setIsOpened(false)}
            >
              Register Here
            </Link>
          </p>
        </div>
      </div>
      {isLoggedIn && (
        <div className={styles.logoutBtn}>
          {isLoggedIn && user && (
            <>
              <div className={styles.one}>
                <img src={profile} alt="" /> {user.name}
              </div>
              <Link to="/profile">Profile</Link>
            </>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
