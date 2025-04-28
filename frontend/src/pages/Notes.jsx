import CreateNote from "../components/CreateNote";
import styles from "../styles/Notes.module.scss";

function Notes() {
  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <div className={styles.notes}>
      {isLoggedIn && (
        <div className={styles.notesPage}>
          <CreateNote />
        </div>
      )}
      <h1>You are not logged in!</h1>
    </div>
  );
}

export default Notes;
