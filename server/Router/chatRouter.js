import express from "express";
import chatController from "./../Controllers/chatController.js";

const router = express.Router();

router.post("/", chatController.createChat);
router.get("/:id", chatController.fetchChat);
router.post('/group/:id', chatController.createGroupChat); // create group chat


router.get("/active-user", chatController.getActiveUsers);
router.delete("/:id", chatController.deleteChatById);

export default router;