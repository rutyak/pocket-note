import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { AddIcon } from "../../assets/Icons";
import CreateGroupModal from "../CreateGroup/CreateGroupModal";

const Sidebar = ({ setNotesCliked, groups, addGroup }) => {
  const [showModel, setShowModel] = useState(false);

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
