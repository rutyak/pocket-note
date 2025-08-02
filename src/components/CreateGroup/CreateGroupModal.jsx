import React, { useState } from "react";
import axios from "axios";
import styles from "./CreateGroupModal.module.css";
import { AddIcon } from "../../assets/Icons";

const colors = [
  "#d88afc",
  "#9cd7f5",
  "#f89a9a",
  "#ffb07c",
  "#4a6cf7",
  "#4e90e2",
];

const CreateGroupModal = ({ showModel, setShowModel, onGroupCreated }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [loading, setLoading] = useState(false);

  // 🔑 call backend API
  const handleCreate = async () => {
    if (!groupName.trim()) return alert("Enter a group name");

    const initials = groupName
      .split(" ")
      .map((w) => w[0].toUpperCase())
      .slice(0, 2)
      .join("");

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.post("http://localhost:5000/api/groups", {
        initials,
        name: groupName,
        color: selectedColor,
      });

      if (onGroupCreated) onGroupCreated(data);

      setGroupName("");
      setSelectedColor(colors[0]);
      setShowModel(false);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong while creating group"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className={styles.fab}
        onClick={() => setShowModel((prev) => !prev)}
      >
        <AddIcon className={styles.addIcon} />
      </button>

      {showModel && (
        <div
          className={styles.overlay}
          onClick={() => setShowModel(false)} // 👈 close on side click
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()} // 👈 prevent close when clicking inside modal
          >
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
