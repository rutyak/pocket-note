import { createContext, useContext, useState } from "react";

const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [notesClicked, setNotesClicked] = useState({});

  return (
    <GroupsContext.Provider value={{ groups, setGroups, notesClicked, setNotesClicked }}>
      {children}
    </GroupsContext.Provider>
  );
};

export const useGroups = () => useContext(GroupsContext);
