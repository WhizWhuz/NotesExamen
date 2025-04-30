import styles from "../styles/Home.module.scss";

function Home() {
  return (
    <div className={styles.homePage}>
      <div className={styles.homeContainer}>
        <div>
          <h1>SwingNotes</h1>
          <h2>Welcome to SwingNotes!</h2>
        </div>
        <p>
          A simple and powerful tool to write, manage, and protect your notes
          across devices. Create an account, login securely, and start noting
          your ideas with ease.
        </p>
      </div>
    </div>
  );
}

export default Home;
