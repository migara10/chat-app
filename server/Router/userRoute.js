import express from "express";
import userController from "./../Controllers/userController.js";

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get('/', userController.getAllUsers);

export default router;