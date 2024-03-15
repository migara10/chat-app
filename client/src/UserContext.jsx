import React, { createContext, useEffect, useState, useContext } from "react";

const UserContext = createContext();

export const CreateUser = ({ children }) => {
  const [userData, setUserDataUser] = useState();
  

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user"));
    setUserDataUser(storedData);
  }, []);

  const updateUser = (newUser) => {
    setUserDataUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logOutUser = () => {
    localStorage.clear();
    
  };

  return (
    <UserContext.Provider value={{ userData, logOutUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
