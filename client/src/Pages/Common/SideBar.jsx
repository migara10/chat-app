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
import { Input } from "@/components/ui/input";

import { useUser } from "@/UserContext.jsx";

const SideBar = ({ parentFunction }) => {
  const { userData } = useUser();
  const [users, setUsers] = useState();
  const [chats, setChats] = useState();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async (e) => {
    setSearch(e?.target.value);
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
        parentFunction();
        setOpen(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>Chat</SheetTrigger>
      <SheetContent side={"left"} className="w-[200px]">
        <SheetHeader>
          <SheetTitle>Find Friends</SheetTitle>
          <input onChange={fetchChats} placeholder="search..." />

          <SheetDescription>
            <div>
              {users &&
                users.map((user) => (
                  <div key={user._id} className="mb-2">
                    <div>
                      <div
                        className="flex items-center"
                        onClick={() => triggerChat(user)}
                      >
                        <Avatar className="opacity-100 d">
                          <AvatarImage src={user.imgUrl} />
                          <AvatarFallback>US</AvatarFallback>
                        </Avatar>
                        <div className="ml-3 font-semibold text-black">
                          {user.name}
                        </div>
                      </div>
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
