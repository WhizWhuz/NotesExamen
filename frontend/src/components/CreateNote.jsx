import { useState } from "react";
import styles from "../styles/CreateNote.module.scss";

function CreateNote({ refreshNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:4000/api/v1/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      console.log("Note created:", data);

      setTitle("");
      setContent("");
      setSuccessMessage("Note successfully created! ✅");

      refreshNotes();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Failed to create note", err);
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <h2>Create a New Note</h2>

        {successMessage && (
          <div className={styles.popUpMessage}>
            <p>{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className={styles.title}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className={styles.br} />
          <textarea
            className={styles.content}
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div>
            <button className={styles.submitButton} type="submit">
              Create note
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default CreateNote;
