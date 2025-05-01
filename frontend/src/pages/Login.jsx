import { useNavigate } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import styles from "../styles/Login.module.scss";

function Login({ setIsLoggedIn }) {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <RegisterPage setIsLoggedIn={setIsLoggedIn} />
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      </div>
    </div>
  );
}

export default Login;
