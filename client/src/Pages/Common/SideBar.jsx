import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import axiosInstance from "./../../auth/axiosInstance.js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

import { useUser } from "@/UserContext.jsx";

const SideBar = () => {
    const { userData } = useUser();
  const [users, setUsers] = useState();
  const [chats, setChats] = useState();
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async (e) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    await axiosInstance
      .get(`/user?userId=${currentUser._id}&search=${e.target.value}`)
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
    <Sheet>
      <SheetTrigger>Chat</SheetTrigger>
      <SheetContent side={"left"} className="w-[200px]">
        <SheetHeader>
          <SheetTitle>Find Friends</SheetTitle>
          <input onChange={fetchChats} placeholder="search..."/>

          <SheetDescription>
            <div>
              {users &&
                users.map((user) => (
                  <div key={user._id} className="mb-2">
                    <div>
                      <SheetClose false className="flex items-center">
                          <Avatar className="opacity-100 d" onClick={() => triggerChat(user)}>
                            <AvatarImage src={user.imgUrl} />
                            <AvatarFallback>US</AvatarFallback>
                          </Avatar>
                          <p className="ml-3 font-semibold text-black">{user.name}</p>
                      </SheetClose>
                    </div>
                  </div>
                ))}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
