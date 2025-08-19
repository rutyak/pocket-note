import React, { useState } from "react";
import styles from "./CreateGroupModal.module.css";
import { toast } from "react-toastify";
import { useGroups } from "../../context/GroupContext";

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
  const [loading, setLoading] = useState(false);

  const { setGroups } = useGroups();

  const handleCreate = () => {
    const trimmedName = groupName.trim();

    if (!trimmedName) {
      return toast.error("Enter a group name");
    }

    if (trimmedName.length < 2) {
      return toast.error("Group name must have at least 2 characters!");
    }

    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];

    const isDuplicate = storedGroups.some(
      (grp) => grp.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      return toast.error("Group name already exists!");
    }

    setLoading(true);

    const initials = trimmedName
      .split(" ")
      .map((w) => w[0]?.toUpperCase())
      .slice(0, 2)
      .join("");

    const newGroup = {
      id: Date.now(), 
      initials,
      name: trimmedName,
      color: selectedColor,
    };

    const updatedGroups = [newGroup, ...storedGroups];

    localStorage.setItem("groups", JSON.stringify(updatedGroups));

    setGroups(updatedGroups);

    setGroupName("");
    setSelectedColor(colors[0]);
    setShowModel(false);

    toast.success("Group created successfully!");
    setLoading(false);
  };

  return (
    <>
      {showModel && (
        <div className={styles.overlay} onClick={() => setShowModel(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Create New Group</h3>

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
                <label className={styles.label2}>Choose Colour</label>
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
              <button onClick={handleCreate} disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateGroupModal;
