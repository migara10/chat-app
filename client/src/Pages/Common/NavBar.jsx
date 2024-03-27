import React from "react";
import { useUser } from "../../UserContext.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import SideBar from "./SideBar.jsx";

const NavBar = ({ triggerChatFunction }) => {
  let navigate = useNavigate();
  const { userData, logOutUser } = useUser();

  const userLogOut = () => {
    logOutUser();
    toast.success("Logout");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };
  const parentFunction = () => {
    triggerChatFunction();
  };

  return (
    <div className="w-full h-12 px-4 bg-slate-400">
      <Toaster position="top-center" reverseOrder={false} />
      {userData && (
        <div className="flex items-center justify-between h-full">
          <SideBar parentFunction={parentFunction} r />
          <div>Hi {userData.name},</div>

          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src={userData.imgUrl} />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-[120px]">
              <div onClick={userLogOut}>Logout</div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default NavBar;
