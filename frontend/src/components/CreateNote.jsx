import { useState } from "react";
import styles from "../styles/CreateNote.module.scss";
import ColorFAB from "./ColorFAB";

function CreateNote({ refreshNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");

  //! Färgen \\
  const [selectedColor, setSelectedColor] = useState("#F7C873");

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
        body: JSON.stringify({ title, content, color: selectedColor }),
      });

      const data = await res.json();
      console.log("Note created:", data);

      if (content.length > 250)
        return setFailureMessage("Note be longer than 250 characters! ❌");
      setTimeout(() => setFailureMessage(""), 3000);
      if (title.length > 50)
        return setFailureMessage("Title cannot longer than 50 characters! ❌");
      setTimeout(() => setFailureMessage(""), 3000);

      setTitle("");
      setContent("");
      setSuccessMessage("Note successfully created! ✅");
      setFailureMessage("");
      refreshNotes();
      setTimeout(() => setSuccessMessage(""), 3000);

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (err) {
      setSuccessMessage("");
      setFailureMessage("Note didn't get saved! ❌", err.message);
      setTimeout(() => setFailureMessage(""), 3000);
    }
  };
  

  return (
    <>
      <div className={styles.fabWrapper}>
        <ColorFAB onSelectColor={(color) => setSelectedColor(color)} />
      </div>
      <div className={styles.formContainer}>

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

        <form onSubmit={handleSubmit}>
          <div
            style={{ backgroundColor: selectedColor }}
            className={styles.formWrapper}
          >
            <input
              className={styles.title}
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className={styles.content}
              placeholder="What's on your mind..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <p>{content.length} / 250</p>
          </div>
          <div className={styles.downbut}>
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
