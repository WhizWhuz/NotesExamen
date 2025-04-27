import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginPage.module.scss";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
        alert(data.message || "Login failed!");
        return;
      }

      localStorage.setItem("token", data.authorization.split(" ")[1]);
      alert("Login successful!");
      navigate("/notes");
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Try again!");
    }
  };

  return (
    <div className={styles.loginPage}>
      <h2>Login to SwingNotes</h2>
      <form onSubmit={handleLogin} className={styles.formLogin}>
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
        <button type="submit" className={styles.submitButton}></button>
      </form>
    </div>
  );
}

export default LoginPage;
