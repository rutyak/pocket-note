import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import CreateGroupModal from "../CreateGroup/CreateGroupModal";
import axios from "axios";

const Sidebar = ({ setNotesCliked }) => {
  const [groups, setGroups] = useState([
    { initials: "MN", name: "My Notes", color: "#4a6cf7" },
  ]);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/groups");
        const data = await res.json();
        setGroups(data);
      } catch (err) {
        console.error("Error fetching groups:", err);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Pocket Notes</h2>

      <ul className={styles.groupList}>
        {groups?.map((grp, index) => (
          <li
            key={index}
            className={styles.groupItem}
            onClick={() => setNotesCliked(grp.name)}
          >
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

      <CreateGroupModal showModel={showModel} setShowModel={setShowModel} />
    </div>
  );
};

export default Sidebar;
