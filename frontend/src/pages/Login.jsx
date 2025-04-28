import LoginPage from "../components/LoginPage";
import styles from "../styles/Login.module.scss";

function Login() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <LoginPage />
      </div>
    </div>
  );
}

export default Login;
