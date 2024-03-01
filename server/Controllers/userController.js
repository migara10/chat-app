import UserModel from "./../models/user.model.js";
import handleError from "./errorHandler.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      pic: req.file ? req.file.path.replace(/\\/g, "/") : null,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    handleError(error, res); // get error messages
  }
};

const loginUser = async (req, res) => {
  // Your login logic here
};

export default {
  registerUser,
  loginUser,
};
