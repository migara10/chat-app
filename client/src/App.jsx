import {createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Chat from "./Components/Chat";
import axios from "axios";
axios.defaults.url =  "http://localhost:5000";

function App() {
  // routers
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/chats",
      element: <Chat />,
    },
    {
      path: "*",
      element: <div>page not found</div>,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
