import CreateNote from "../components/CreateNote";
import styles from "../styles/Notes.module.scss";

function Notes() {
  return (
    <div className={styles.notesPage}>
      <CreateNote />
    </div>
  );
}

export default Notes;
