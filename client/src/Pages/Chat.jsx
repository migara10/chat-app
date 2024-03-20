import React, { useEffect, useImperativeHandle, useState } from "react";
import { useUser } from "../UserContext.jsx";
import axiosInstance from "./../auth/axiosInstance.js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImBin } from "react-icons/im";

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
    axiosInstance
      .get(`/chat/${userData._id}`)
      .then((res) => {
        setActiveUsers(res.data.existingChat);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div onClick={fetchUsers}>Chat</div>
      <div className="h-[500px] rounded-lg w-[200px] bg-yellow-50">
        {activeUsers &&
          activeUsers.map((user) => (
            <div key={user._id} className="flex items-center justify-between p-2">
              <Avatar>
                <AvatarImage src={user.users[1].imgUrl} />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
              {user.users[1].name}
              <ImBin className="cursor-pointer " />
            </div>
          ))}
      </div>
    </div>
  );
});

export default Chat;
