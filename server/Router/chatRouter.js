import express from "express";
import chatController from "./../Controllers/chatController.js";

const route = express.Router();

route.post("/", chatController.createChat);
route.get("/", chatController.fetchChat);

export default route;