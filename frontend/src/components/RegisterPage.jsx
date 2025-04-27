import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/RegisterPage.module.scss";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed!");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("Registration successful!");
      navigate("/notes");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Soomething went wrong. Try again!");
    }
  };

  return (
    <div className={styles.regPage}>
      <h2>Register to SwingNotes</h2>
      <form onSubmit={handleRegister} className={styles.regForm}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit" className={styles.btnSubmit}></button>
      </form>
    </div>
  );
}

export default RegisterPage;
