import React, { useState } from "react";
import axios from "axios";
import styles from "./CreateGroupModal.module.css";
import { AddIcon } from "../../assets/Icons";
import { toast } from "react-toastify";
import { useGroups } from "../../context/GroupContext";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

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

  const { setGroups } = useGroups(); 

  const handleCreate = async () => {
    if (!groupName.trim()) return toast.error("Enter a group name");

    const initials = groupName
      .split(" ")
      .map((w) => w[0]?.toUpperCase())
      .slice(0, 2)
      .join("");

    console.log("initials", initials);
    
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${base_url}/create/group`,
        {
          initials,
          name: groupName,
          color: selectedColor,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGroups((prev) => [data, ...prev]);

      if (onGroupCreated) onGroupCreated(data);

      setGroupName("");
      setSelectedColor(colors[0]);
      setShowModel(false);

      toast.success("Group created successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while creating group"
      );
    } finally {
      setLoading(false);
    }
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
