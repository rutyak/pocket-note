import React from 'react';
import styles from './App.module.css';
import Sidebar from './components/Sidebar/Sidebar';
import MyNotes from './components/MyNotes/MyNotes';

function App() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <MyNotes />
    </div>
  );
}

export default App;