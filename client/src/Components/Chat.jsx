import React, { useEffect, useState } from "react";
import axios from 'axios';

function Chat() {
  const [chats, setChats] = useState();

  useEffect(() => {
    fetchChats();
  }, [])

  const fetchChats = async () => {
    await axios
      .get("http://localhost:5000/chats", {})
      .then((response) => {
        setChats(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
    {chats && chats.map((chat) => (
      <div key={chat._id}>
        <p>{chat.chatName}</p>
      </div>
    ))}
  </div>
  )
}

export default Chat;
