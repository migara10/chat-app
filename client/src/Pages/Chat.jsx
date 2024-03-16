import React, { useEffect, useState } from "react";
import axios from "./../auth/axiosInstance.js";
import { useUser } from "../UserContext.jsx";
import { color } from "framer-motion";



import { Button } from "@/components/ui/button";

function Chat() {
 

  

  
  return (
    <div>
      <div>
        {userData && (
          <div>
            <p style={{ color: "red", background: "gray" }}>{userData.name}</p>
            
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
