import { useState, useEffect } from "react";
import CreateNote from "../components/CreateNote";
import RecentNotes from "../components/RecentNotes";
import styles from "../styles/Notes.module.scss";
import Login from "./Login";
import { AnimatePresence, motion } from "framer-motion";

function Notes({ isLoggedIn, setIsLoggedIn }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");

  ////////*--Fetch Notes---*\\\\\\\\
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
  ////////*---Delete Notes---*\\\\\\\\
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
  ////////*---Update Notes---*\\\\\\\\
  const updateNote = async (id, updatedData) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:4000/api/v1/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update note.");
      setSuccessMessage("Note successfully updated! ✅");
      setFailureMessage("");
      setTimeout(() => setSuccessMessage(""), 3000);
      await fetchNotes();
    } catch (err) {
      console.error("Update error:", err.message);
      setFailureMessage("Note didn't get updated! ❌");
      setSuccessMessage("");
      setTimeout(() => setFailureMessage(""), 3000);
    }
  };

  const handleUpdate = () => {
    onUpdate(note._id, { title, content, color: note.color });
    setIsEditing(false);
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
          <>
            <motion.div className={styles.recentContainer} layout>
              <AnimatePresence>
                {recentNotes.map((note) => (
                  <motion.div
                    key={note._id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, height: "20%" }}
                    animate={{ opacity: 1, scale: 1, height: "100%" }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <RecentNotes
                      note={note}
                      onDelete={deleteNote}
                      onUpdate={updateNote}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
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
