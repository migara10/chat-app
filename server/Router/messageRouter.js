import express from "express";
import messageController from "./../Controllers/messageController.js";

const router = express.Router();

router.post('/', messageController.sendMessage);
router.post('/:chatId', messageController.allMessages)

export default router;