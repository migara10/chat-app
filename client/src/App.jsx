import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
import axios from "axios";
axios.defaults.url = "http://localhost:5000";

import { CreateUser } from "./UserContext";

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

  return (
    <CreateUser>
      <RouterProvider router={router}></RouterProvider>
    </CreateUser>
  );
}

export default App;
