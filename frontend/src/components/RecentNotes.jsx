import styles from "../styles/RecentNotes.module.scss";
import edit from "../assets/svgs/edit.svg";
import trash from "../assets/svgs/delete.svg";
import { useState } from "react";

function RecentNotes({ note, onDelete, onUpdate }) {
  const backgroundColor = note.color || "#F7C873"; // fallback
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleUpdate = () => {
    onUpdate(note._id, { title, content, color: note.color });
    setIsEditing(false);
  };

  return (
    <div className={styles.recentNotes} style={{ backgroundColor }}>
      {isEditing ? (
        <>
          <input
            className={styles.editInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className={styles.editTextarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className={styles.edit}>
            <button className={styles.yes} onClick={handleUpdate}>
              Save
            </button>
            <button className={styles.no} onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.titleContainer}>
            <button onClick={() => setIsEditing(true)}>
              <img className={styles.edit} src={edit} alt="" />
            </button>
            <h4 className={styles.title}>{note?.title}</h4>
            <button onClick={() => onDelete(note._id)}>
              <img className={styles.bin} src={trash} alt="" />
            </button>
          </div>
          <div className={styles.contentContainer}>
            <p className={styles.content}>{note?.content}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default RecentNotes;
