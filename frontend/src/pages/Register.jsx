import RegisterPage from "../components/RegisterPage";
import styles from "../styles/Register.module.scss";

function Register({ setIsLoggedIn }) {
  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <RegisterPage setIsLoggedIn={setIsLoggedIn} />
      </div>
    </div>
  );
}

export default Register;
