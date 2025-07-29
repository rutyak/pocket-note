import React from "react";
import styles from "./MyNotes.module.css";
import { CiPaperplane } from "react-icons/ci";

const MyNotes = () => {
  return (
    <div className={styles.container}>
      {/* Navbar */}
      <div className={styles.navbar}>
        <div className={styles.logo}>MN</div>
        <span>My Notes</span>
      </div>

      {/* Note Card */}
      <div className={styles.noteCard}>
        <p>
          Another productive way to use this tool to begin a daily writing
          routine. One way is to generate a random paragraph with the intention
          to try to rewrite it while still keeping the original meaning. The
          purpose here is to just get the writing started so that when the
          writer goes onto their day's writing projects, words are already
          flowing from their fingers.
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
