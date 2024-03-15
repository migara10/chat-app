import React, { useEffect, useState } from "react";
import axios from "./../auth/axiosInstance.js";
import { useUser } from "../UserContext.jsx";
import { color } from "framer-motion";
import axiosInstance from "./../auth/axiosInstance.js";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

function Chat() {
  const [chats, setChats] = useState();
  const [users, setUsers] = useState();
  const [search, setSearch] = useState("");

  const { userData } = useUser();

  useEffect(() => {
    fetchChats();
  }, []); // Include search in the dependency array to re-fetch chats when search changes

  const fetchChats = async (key) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    await axiosInstance
      .get(`/user?userId=${currentUser._id}&search=${search}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const triggerChat = async (data) => {
    const chatObj = {
      adminId: userData._id,
      userId: data._id,
    };
    await axiosInstance
      .post("/chat", chatObj)
      .then((response) => {
        setChats(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <div>
        {userData && (
          <div>
            <p style={{ color: "red", background: "gray" }}>{userData.name}</p>
            {users &&
              users.map((user) => (
                <div key={user._id}>
                  <p onClick={() => triggerChat(user)}>{user.name}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
