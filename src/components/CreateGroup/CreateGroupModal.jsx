import React, { useState } from "react";
import styles from "./CreateGroupModal.module.css";

const colors = [
  "#d88afc",
  "#9cd7f5",
  "#f89a9a",
  "#ffb07c",
  "#4a6cf7",
  "#4e90e2",
];

const CreateGroupModal = ({ showModel, setShowModel }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleCreate = () => {
    if (!groupName.trim()) return alert("Enter a group name");

    const initials = groupName
      .split(" ")
      .map((w) => w[0].toUpperCase())
      .slice(0, 2)
      .join("");

    addGroup({
      initials,
      name: groupName,
      color: selectedColor,
    });

    closeModal();
  };

  return (
    <>
      <button
        className={styles.fab}
        onClick={() => {
          console.log("plus clicked...");
          setShowModel((prev) => !prev);
        }}
      >
        +
      </button>

      {showModel && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h3>Create New group</h3>

            <div className={styles.container}>
              <div className={styles.inputStyle}>
                <label className={styles.label1}>Group Name</label>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    placeholder="Enter group name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="rounded-2xl border"
                  />
                </div>
              </div>

              <div className={styles.inputStyle}>
                <label className={styles.label2}>Choose colour</label>
                <div className={styles.colorOptions}>
                  {colors.map((c, i) => (
                    <span
                      key={i}
                      className={`${styles.colorCircle} ${
                        selectedColor === c ? styles.selected : ""
                      }`}
                      style={{ backgroundColor: c }}
                      onClick={() => setSelectedColor(c)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.createBtn}>
              <button onClick={handleCreate}>Create</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateGroupModal;
