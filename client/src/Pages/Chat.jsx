import React, { useEffect, useImperativeHandle, useState } from "react";
import { useUser } from "../UserContext.jsx";
import axiosInstance from "./../auth/axiosInstance.js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImBin } from "react-icons/im";
import axios from "axios";
import ChatPopup from "./ChatPopup.jsx";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";

const Chat = React.forwardRef((props, ref) => {
  const { userData } = useUser();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetchUsers();
    }, 1000);
  }, [userData]);

  // Expose the fetchUsers function through the ref
  useImperativeHandle(ref, () => ({
    fetchUsers,
  }));

  const fetchUsers = () => {
    if (!userData || !userData._id) return;

    axiosInstance
      .get(`/chat/${userData._id}`)
      .then((res) => {
        setActiveUsers(res.data.existingChat);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteChat = async (id) => {
    axiosInstance
      .delete(`/chat/${id}`)
      .then((res) => {
        setActiveUsers(activeUsers.filter((chat) => chat._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div onClick={fetchUsers}>Chat1</div>
      <div className="h-[500px] rounded-lg w-[200px] bg-yellow-50">
        {activeUsers &&
          activeUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-2"
            >
              <Drawer>
                <DrawerTrigger>
                  <Avatar>
                    <AvatarImage src={user.users[1].imgUrl} />
                    <AvatarFallback>US</AvatarFallback>
                  </Avatar>
                </DrawerTrigger>
                {user.users[1].name}
                <ImBin
                  onClick={() => deleteChat(user._id)}
                  className="cursor-pointer "
                />
                <ChatPopup user={user} />
              </Drawer>
            </div>
          ))}
      </div>
    </div>
  );
});

export default Chat;
