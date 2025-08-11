import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyNotes.module.css";
import { CiPaperplane } from "react-icons/ci";
import { BackArrow, SendIcon } from "../../assets/Icons";
import { useGroups } from "../../context/GroupContext";
import { useNavigate } from "react-router-dom";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

const MyNotes = () => {
  const { notesClicked, setNotesClicked } = useGroups();

  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!notesClicked?.name) return;

    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          `${base_url}/notes?group=${notesClicked.name}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotes(res.data);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };

    fetchNotes();
  }, [notesClicked, token]);

  const handleSend = async () => {
    console.log("sned clicked");
    if (!noteText.trim()) return;

    const newNote = {
      content: noteText.trim(),
      group: notesClicked.name,
      createdAt: new Date().toISOString(),
      groupName: notesClicked.name,
    };

    try {
      setLoading(true);
      const res = await axios.post(`${base_url}/create/note`, newNote, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const savedNote = res.data || newNote;
      setNotes((prev) => [savedNote, ...prev]);
      setNoteText("");
    } catch (err) {
      console.error("Error creating note:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${styles.container} ${
        notesClicked ? styles.noteOpen : styles.noteClose
      }`}
    >
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

          <button
            className={styles.logoutBtn}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
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
                className={styles.sendBtn}
                style={{ opacity: loading ? 0.5 : 1 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNotes;
