import { useState, useEffect } from "react";
import CreateNote from "../components/CreateNote";
import RecentNotes from "../components/RecentNotes";
import styles from "../styles/Notes.module.scss";
import Login from "./Login";

function Notes({ isLoggedIn, setIsLoggedIn }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (!isLoggedIn) {
    return (
      <div className={styles.hidden}>
        <div className={styles.hiddeninside}>
          <Login setIsLoggedIn={setIsLoggedIn} />
        </div>
      </div>
    );
  }

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

      await fetchNotes(); // refresh after delete
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };
  return (
    <div className={styles.notes}>
      <div className={styles.notesPage}>
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
      </div>
    </div>
  );
}

export default Notes;
