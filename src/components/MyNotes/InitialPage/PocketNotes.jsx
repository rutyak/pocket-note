import React from "react";
import styles from "./PocketNotes.module.css";

function PocketNotes() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Pocket Notes</h2>
        <p className={styles.subtitle}>
          Send and receive messages without keeping your phone online.
          <br />
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
      </div>
      <p className={styles.footer}>🔒 end-to-end encrypted</p>
    </div>
  );
}

export default PocketNotes;
