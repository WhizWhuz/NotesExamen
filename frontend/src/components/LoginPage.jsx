import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginPage.module.scss";
import ghicon from "../assets/svgs/github.svg";
import fbicon from "../assets/svgs/facebook.svg";
import ggicon from "../assets/svgs/google.svg";

function LoginPage({ setIsLoggedIn, setIsOpened }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");token
    if (token) {
      navigate("/notes");
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something has gone wrong!");
      }

      localStorage.setItem("token", data.token);
      setIsLoggedIn(true); // 🥷 tell Notes page to hide the overlay
      navigate("/notes");
      setIsOpened(false);
    } catch (err) {
      setError(err.message); // Now shows the real backend message!
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.loginForm}>
      <h2>Login to SwingNotes</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <p>or login with</p>
      <div className={styles.icons}>
        <button>
          <img src={ghicon} alt="" />
        </button>
        <button>
          <img src={ggicon} alt="" />
        </button>
        <button>
          <img src={fbicon} alt="" />
        </button>
      </div>
      <button type="submit" className={styles.btnSubmit}>
        Submit
      </button>
    </form>
  );
}

export default LoginPage;
