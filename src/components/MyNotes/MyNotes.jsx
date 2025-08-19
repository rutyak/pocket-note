import React, { useState, useEffect } from "react";
import styles from "./MyNotes.module.css";
import { BackArrow, SendIcon } from "../../assets/Icons";
import { useGroups } from "../../context/GroupContext";

const MyNotes = () => {
  const { notesClicked, setNotesClicked } = useGroups();

  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!notesClicked?.name) return;

    const storedNotes =
      JSON.parse(localStorage.getItem(`notes-${notesClicked.name}`)) || [];
    setNotes(storedNotes);
  }, [notesClicked]);

  const handleSend = () => {
    if (!noteText.trim()) return;

    setLoading(true);

    const newNote = {
      content: noteText.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);

    // Save to localStorage
    localStorage.setItem(
      `notes-${notesClicked.name}`,
      JSON.stringify(updatedNotes)
    );

    setNoteText("");
    setLoading(false);
  };

  return (
    <div
      className={`${styles.container} ${
        notesClicked ? styles.noteOpen : styles.noteClose
      }`}
    >
      {/* Navbar */}
      <div className={styles.navbar}>
        <div className={styles.navbarInner}>
          <div className={styles.groupName}>
            <button
              onClick={() => setNotesClicked("")}
              className={styles.backBtn}
            >
              <BackArrow />
            </button>
            <div
              className={styles.logo}
              style={{ backgroundColor: `${notesClicked.color}` }}
            >
              {notesClicked.initials}
            </div>
            <span className={styles.name}>{notesClicked.name}</span>
          </div>
        </div>
      </div>

      <div className={styles.noteCardContainer}>
        {notes.map((note, i) => {
          const date = new Date(note.createdAt);
          const formattedDate = date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
          const formattedTime = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div key={i} className={styles.noteCard}>
              <p>{note.content}</p>
              <div className={styles.noteFooter}>
                <span>{formattedDate}</span>
                <span>•</span>
                <span>{formattedTime}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.wrapper}>
        <div className={styles.textareaContainer}>
          <div style={{ position: "relative" }}>
            <textarea
              className={styles.textarea}
              placeholder="Enter your text here............"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <div onClick={handleSend}>
              <SendIcon
                className={`${styles.sendBtn} ${
                  noteText.trim().length > 0 ? styles.active : styles.inactive
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNotes;
