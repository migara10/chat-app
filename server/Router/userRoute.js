import express from "express";
import userController from "./../Controllers/userController.js";

const route = express.Router();

route.post("/register", userController.registerUser);
route.post("/login", userController.loginUser);
route.get('/', userController.getAllUsers);

export default route;