import React, { useState } from "react";
import styles from "./App.module.css";
import Sidebar from "./components/Sidebar/Sidebar";
import MyNotes from "./components/MyNotes/MyNotes";

function App() {
  const groups = [
    { initials: "MN", name: "My Notes", color: "#4a6cf7" },
    { initials: "MG", name: "My personal grp", color: "#d88afc" },
    { initials: "JS", name: "Javascript grp", color: "#f89a9a" },
    { initials: "HT", name: "HTML grp", color: "#5fd9d8" },
    { initials: "CN", name: "CSS Notes", color: "#ff7d66" },
    { initials: "SN", name: "SQL Notes", color: "#4e90e2" },
    { initials: "PN", name: "Python Notes", color: "#d97df0" },
  ];
  const [groupsState, setGroupsState] = useState(groups);
  const [notesCliked, setNotesCliked] = useState("");

  const addGroup = (newGroup) => {
    setGroupsState((prev) => [...prev, newGroup]);
  };

  return (
    <div className={styles.app}>
      <div
        className={
          notesCliked? styles.sidebarNone : styles.sidebarBlock
        }
      >
        <Sidebar
          notesCliked={notesCliked}
          setNotesCliked={setNotesCliked}
          groups={groupsState}
          addGroup={addGroup}
        />
      </div>
      <MyNotes notesCliked={notesCliked} />
    </div>
  );
}

export default App;
