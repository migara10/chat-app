import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/auth/axiosInstance";
import { useUser } from "@/UserContext.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SelectedUSers from "./SelectedUSers";

const GroupChatPopup = () => {
  const { userData } = useUser();
  const [users, setUsers] = useState([]);
  const [groupChat, addGroupChat] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (searchTerm = "") => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const response = await axiosInstance.get(
        `/user?userId=${currentUser._id}&search=${searchTerm}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUserToGroupChat = (user) => {
    if (groupChat.some((existingUser) => existingUser._id === user._id)) return;
    addGroupChat([...groupChat, user]);
  };

  const deleteUSerInGroupChat = (user) => {
    addGroupChat(groupChat.filter((u) => u._id !== user._id));
  };

  const createGroupChat = async  (e) => {
    if (!userData || !userData._id) return;
    const data = {
      name: groupName,
      users: groupChat
    }
    e.preventDefault();
    await axiosInstance.post(`/chat/group/${userData._id}`, {data})
    console.log("create", groupName, groupChat);
    setOpen(false)
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>Create Group Chat</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Group Chat</DialogTitle>
            <div className="flex">
              {groupChat &&
                groupChat.map((user) => (
                  <div key={user._id} className="mr-2">
                    <SelectedUSers
                      userData={user}
                      deleteUser={() => deleteUSerInGroupChat(user)}
                    />
                  </div>
                ))}
            </div>
            <DialogDescription>
              <div className="flex justify-between">
                <div className="w-1/3">
                  <input
                    className="h-8 border-2 border-gray-700"
                    onChange={(e) => fetchUsers(e.target.value)}
                    placeholder="Search..."
                  />
                  {users.map((user) => (
                    <div key={user._id} className="mt-2">
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => addUserToGroupChat(user)}
                      >
                        <div className="flex items-center justify-between w-full font-semibold text-black rounded-md bg-slate-400">
                          <Avatar className="w-6 h-6 opacity-100">
                            <AvatarImage src={user.imgUrl} />
                            <AvatarFallback>US</AvatarFallback>
                          </Avatar>
                          <div className="w-full ml-3 text-start">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-start w-1/3 ">
                  Enter Group Name
                  <form action="">
                    <input
                      className="h-8 border-2 border-gray-700"
                      onChange={(e) => setGroupName(e.target.value)}
                      placeholder="Search..."
                    />
                    <button
                      type="submit"
                      className="p-2 mt-4 text-white bg-red-400 rounded-lg"
                      onClick={createGroupChat}
                    >
                      Create Group
                    </button>
                  </form>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupChatPopup;
