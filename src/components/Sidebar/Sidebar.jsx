import React from "react";
import styles from "./Sidebar.module.css";

const groups = [
  { initials: "MN", name: "My Notes", color: "#4a6cf7" },
  { initials: "MG", name: "My personal grp", color: "#d88afc" },
  { initials: "JS", name: "Javascript grp", color: "#f89a9a" },
  { initials: "HT", name: "HTML grp", color: "#5fd9d8" },
  { initials: "CN", name: "CSS Notes", color: "#ff7d66" },
  { initials: "SN", name: "SQL Notes", color: "#4e90e2" },
  { initials: "PN", name: "Python Notes", color: "#d97df0" },
];

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Pocket Notes</h2>

      <ul className={styles.groupList}>
        {groups.map((grp, index) => (
          <li key={index} className={styles.groupItem}>
            <div
              className={styles.avatar}
              style={{ backgroundColor: grp.color }}
            >
              {grp.initials}
            </div>
            <span className={styles.groupName}>{grp.name}</span>
          </li>
        ))}
      </ul>

      {/* Floating Button */}
      <button className={styles.fab}>+</button>
    </div>
  );
};

export default Sidebar;
