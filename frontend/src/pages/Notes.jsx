import { useState, useEffect } from "react";
import CreateNote from "../components/CreateNote";
import RecentNotes from "../components/RecentNotes";
import styles from "../styles/Notes.module.scss";
import Login from "./Login";

function Notes({ isLoggedIn, setIsLoggedIn }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");

  // ✅ Fetch notes from backend
  const fetchNotes = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:4000/api/v1/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch notes.");
      }

      setNotes(data.notes);
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotes();
    }
  }, [isLoggedIn]);

  const recentNotes = [...notes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 9);

  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:4000/api/v1/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete note.");
      }
      setSuccessMessage("Note successfully deleted! ✅");
      setFailureMessage("");
      setTimeout(() => setSuccessMessage(""), 3000);
      await fetchNotes(); // refresh after delete
    } catch (err) {
      console.error("Delete error:", err.message);
      setFailureMessage("Note didn't get deleted! ❌");
      setSuccessMessage("");
      setTimeout(() => setFailureMessage(""), 3000);
    }
  };
  return (
    <div className={styles.notes}>
      <div className={styles.notesPage}>
        {!isLoggedIn && (
          <div className={styles.hidden}>
            <div className={styles.hiddeninside}>
              <Login setIsLoggedIn={setIsLoggedIn} />
            </div>
          </div>
        )}
        <CreateNote refreshNotes={fetchNotes} />
      </div>
      <div className={styles.recentContainer}>
        {loading ? (
          <p>Loading notes...</p>
        ) : recentNotes.length === 0 ? (
          <p>No recent notes found.</p>
        ) : (
          recentNotes.map((note) => (
            <RecentNotes key={note._id} note={note} onDelete={deleteNote} />
          ))
        )}
        {successMessage && (
          <div className={styles.popUpMessage}>
            <p>{successMessage}</p>
          </div>
        )}
        {failureMessage && (
          <div className={styles.popUpMessageNeg}>
            <p>{failureMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
