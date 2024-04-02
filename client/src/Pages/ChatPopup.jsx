import React from "react";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatPopup = ({ user }) => {
  return (
    <div>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <div className="flex items-center">
              {!user.isGroupChat && (
                <Avatar>
                  <AvatarImage src={user.users[1].imgUrl} />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
              )}
              <div className={`${!user.isGroupChat && "hidden"} ml-2`}>
                <input
                  className="h-8 border-2 border-gray-700"
                  placeholder="Enter Group Name"
                  value={user.isGroupChat && user.chatName}
                />
                <Button className="ml-2">Save</Button>
              </div>
            </div>
          </DrawerTitle>
          <DrawerDescription>
            {user.isGroupChat ? "" : user.users[1].name}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <p>{user.users[1].name}</p>

          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </div>
  );
};

export default ChatPopup;
