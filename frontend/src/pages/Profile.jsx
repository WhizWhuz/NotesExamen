import { useState, useEffect } from "react";
import RecentNotes from "../components/RecentNotes";
import styles from "../styles/Profile.module.scss";
import profile from "../assets/svgs/person.svg";

function Profile() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:4000/api/v1/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log(data.user.email);
        console.log(data.user.name);
        if (res.ok) setUser(data.user);
      } catch (err) {
        console.error("User fetch failed:", err.message);
      }
    };

    fetchUser();
  }, []);

  // ✅ Fetch ALL notes from backend
  const fetchAllNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:4000/api/v1/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch notes.");

      setNotes(data.notes);
    } catch (err) {
      console.error("Error fetching notes:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  // ✅ Optional: sort newest first
  const allNotes = [...notes].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // ✅ Optional: delete note from profile
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

      await fetchAllNotes(); // refresh
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const recentNotes = [...notes]
    .filter((note) =>
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 9);

  const filteredNotes = allNotes.filter((note) =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.Wrapper}>
      <div className={styles.recentContainer}>
        <div className={styles.notesContainer}>
          {/* <div className={styles.allnotes}>
          <p>{allNotes.length}</p>
        </div> */}
          {loading ? (
            <p>Loading notes...</p>
          ) : filteredNotes.length === 0 ? (
            <p>You have no notes.</p>
          ) : (
            filteredNotes.map((note) => (
              <RecentNotes key={note._id} note={note} onDelete={deleteNote} />
            ))
          )}
        </div>
      </div>
      <input
        className={styles.searcharea}
        type="text"
        placeholder="Search note content..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.profileContainer}>
        {loading ? (
          <p>Loading profile...</p>
        ) : (
          <>
            <div className={styles.profile}>
              <img className={styles.profileImg} src={profile} alt="" />
              <h1>{user?.name}</h1>
            </div>
            <div className={styles.profile}>
              <h2>email: {user?.email}</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
