import React from "react";
import styles from "./Welcome.module.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>📒 Pocket Notes</h1>
        <p className={styles.subtitle}>
          Organize your thoughts, store notes in groups, and never lose track of
          your ideas again!
        </p>
        <div className={styles.buttons}>
          <button
            onClick={() => navigate("/login")}
            className={styles.loginBtn}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className={styles.signupBtn}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
