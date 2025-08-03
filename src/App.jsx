import React, { useState } from "react";
import styles from "./App.module.css";
import Sidebar from "./components/Sidebar/Sidebar";
import MyNotes from "./components/MyNotes/MyNotes";
import PocketNotes from "./components/MyNotes/InitialPage/PocketNotes";
import { useGroups } from "./context/GroupContext";
import { useEffect } from "react";

function App() {
  const { notesClicked, setNotesClicked } = useGroups();

  useEffect(() => {
     setNotesClicked("");
  }, []);

  return (
    <div className={styles.app}>
      <Sidebar />

      <div className={styles.mainContent}>
        {notesClicked ? (
          <MyNotes/>
        ) : (
          <PocketNotes />
        )}
      </div>
    </div>
  );
}

export default App;
