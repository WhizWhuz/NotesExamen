import styles from "../styles/RecentNotes.module.scss";
import trash from "../assets/svgs/delete.svg";

function RecentNotes({ note, onDelete }) {
  const colors = [
    "#94B4C1", // dusty teal
    "#ECEFCA", // pale cream
    "#A1C1CB", // soft cyan-gray
    "#E5B4A1", // warm clay rose
    "#F2D3AC", // warm sand
    "#BDC8D6", // cloudy silver-blue
  ];

  const backgroundColor = colors[Math.floor(Math.random() * colors.length)];
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
