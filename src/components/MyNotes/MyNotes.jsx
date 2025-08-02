import React from "react";
import styles from "./MyNotes.module.css";
import { CiPaperplane } from "react-icons/ci";
import { BackArrow } from "../../assets/Icons";

const MyNotes = ({ notesCliked, setNotesCliked }) => {
  if (!notesCliked) return null;

  const handleBack = () => {
    setNotesCliked(""); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <button onClick={handleBack} className={styles.backBtn}>
          <BackArrow />
        </button>
        <div className={styles.logo}>MN</div>
        <span className={styles.name}>{notesCliked}</span>
      </div>

      <div className={styles.noteCard}>
        <p>
          Another productive way to use this tool to begin a daily writing
          routine. One way is to generate a random paragraph with the
          intention to try to rewrite it while still keeping the original
          meaning. The purpose here is to just get the writing started so that
          when the writer goes onto their day's writing projects, words are
          already flowing from their fingers.
        </p>
        <div className={styles.noteFooter}>
          <span>9 Mar 2023</span>
          <span>•</span>
          <span>10:10 AM</span>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div style={{ position: "relative" }}>
          <textarea
            className={styles.textarea}
            placeholder="Enter your text here............"
          />
          <CiPaperplane className={styles.sendBtn} />
        </div>
      </div>
    </div>
  );
};

export default MyNotes;
