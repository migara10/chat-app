import React, { useRef, useState } from "react";
import NavBar from "../Common/NavBar";
import Chat from "../Chat";

const Dashboard = () => {
  const chatRef = useRef(null);

  const triggerChatFunction = () => {
    handleChildFunction();
  };

  const handleChildFunction = () => {
    chatRef.current.fetchUsers();
  };

  return (
    <div>
      <NavBar triggerChatFunction={triggerChatFunction} />
      <Chat ref={chatRef} />
    </div>
  );
};

export default Dashboard;
