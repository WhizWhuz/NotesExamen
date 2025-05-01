import styles from "../styles/RecentNotes.module.scss";
import trash from "../assets/svgs/delete.svg";

function RecentNotes({ note, onDelete }) {
  const backgroundColor = note.color || "#F7C873"; // fallback
  return (
    <div className={styles.recentNotes} style={{ backgroundColor }}>
      <div className={styles.titleContainer}>
        <h4 className={styles.title}>{note?.title}</h4>
        <button onClick={() => onDelete(note._id)}>
          <img src={trash} alt="" />
        </button>
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.content}>{note?.content}</p>
      </div>
    </div>
  );
}

export default RecentNotes;
