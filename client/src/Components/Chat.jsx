import React, { useEffect, useState } from "react";
import axios from './../auth/axiosInstance.js';
import { Button } from "@chakra-ui/react";

function Chat() {
  const [chats, setChats] = useState();

  useEffect(() => {
    fetchChats();
  }, [])

  const fetchChats = async () => {
    await axios
      .get("/chats", {})
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
        <Button>ABC</Button>
      </div>
    ))}
  </div>
  )
}

export default Chat;
