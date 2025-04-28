import RegisterPage from "../components/RegisterPage";
import styles from "../styles/Register.module.scss";

function Register() {
  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <RegisterPage />
      </div>
    </div>
  );
}

export default Register;
