import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import { useGroups } from "../../context/GroupContext";
import CreateGroupModal from "../CreateGroup/CreateGroupModal";
import { AddIcon } from "../../assets/Icons";

const Sidebar = () => {
  const { groups, setGroups, notesClicked, setNotesClicked } = useGroups();
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(storedGroups);
  }, [setGroups]);

  return (
    <div
      className={`${styles.sidebar} ${
        notesClicked ? styles.groupsClose : styles.groupsOpen
      }`}
    >
      <h2 className={styles.title}>Pocket Notes</h2>

      <ul className={styles.groupList}>
        {groups?.map((grp, index) => (
          <li
            key={index}
            className={`${styles.groupItem} ${
              notesClicked?.name === grp.name ? styles.active : ""
            }`}
            onClick={() =>
              setNotesClicked({
                initials: grp.initials,
                color: grp.color,
                name: grp.name,
              })
            }
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

      <button className={styles.fab} onClick={() => setShowModel(true)}>
        <AddIcon className={styles.plusIcon} />
      </button>

      <CreateGroupModal showModel={showModel} setShowModel={setShowModel} />
    </div>
  );
};

export default Sidebar;
