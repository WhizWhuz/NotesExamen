import { useState } from "react";
import CreateNote from "../components/CreateNote";
import styles from "../styles/Notes.module.scss";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

function Notes({ isLoggedIn, setIsLoggedIn }) {
  return (
    <div className={styles.notes}> 
      {!isLoggedIn && (
        <div className={styles.hidden}>
          <div className={styles.hiddeninside}>
            <Login />
          </div>
        </div>
      )}
      <div className={styles.notesPage}>
        <CreateNote />
      </div>
    </div>
  );
}

export default Notes;
