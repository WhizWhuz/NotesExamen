import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/RegisterPage.module.scss";
import ghicon from "../assets/svgs/github.svg";
import fbicon from "../assets/svgs/facebook.svg";
import ggicon from "../assets/svgs/google.svg";

function RegisterPage({ setIsLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/notes");
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [alert, setAlert] = useState(false);

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

      setAlert(true);
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      setTimeout(() => navigate("/notes"), 3000);
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Something went wrong. Try again!");
    }
  };

  return (
    <form onSubmit={handleRegister} className={styles.regForm}>
      {alert && (
        <>
          <div className={styles.regSuccess}>
            <h3>Registration successful!</h3>
          </div>
        </>
      )}
      <h2>Register to SwingNotes</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <p>or register with</p>
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

export default RegisterPage;
