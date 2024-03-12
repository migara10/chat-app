import React, { useEffect, useState } from "react";
import axios from "./../auth/axiosInstance.js";
import { Button } from "@chakra-ui/react";
import { useUser } from "../UserContext.jsx";
import { color } from "framer-motion";

function Chat() {
  const [chats, setChats] = useState();
  const [users, setUsers] = useState();
  const [search, setSearch] = useState("");

  const { userData } = useUser();

  useEffect(() => {
    fetchChats();
  }, []); // Include search in the dependency array to re-fetch chats when search changes

  const fetchChats = async (key) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(
        `/user?userId=${currentUser._id}&search=${search}`
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        {userData && (
          <div>
            <p style={{ color: "red", background: "gray" }}>{userData.name}</p>
            {users &&
              users.map((user) => (
                <div key={user._id}>
                  <p>{user.name}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
