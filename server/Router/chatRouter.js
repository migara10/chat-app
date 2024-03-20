import express from "express";
import chatController from "./../Controllers/chatController.js";

const router = express.Router();

router.post("/", chatController.createChat);
router.get("/:id", chatController.fetchChat);
router.get("/active-user", chatController.getActiveUsers);

export default router;