import UserModel from "./../models/user.model.js";
import handleError from "../utils/errorHandler.js";
import generateToken from "../utils/Tokens.js";
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
  try {
    const { email, password } = req.body;

    // Find user by email and select only necessary fields
    const user = await UserModel.findOne({ email }).exec();

    if (!user) {
      return res.status(400).send({ message: "Valid User Not Found." });
    }

    const accessToken = await generateToken(
      user,
      process.env.ACCESS_KEY,
      "10m"
    );
    const refreshToken = await generateToken(
      user,
      process.env.REFRESH_KEY,
      "1h"
    );

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid Password." });
    }

    return res
      .status(200)
      .send({ message: "Login Success", user, refreshToken, accessToken });
  } catch (error) {
    handleError(error, res); // get error messages
  }
};

const gelAllUsers = async (req, res) => {
  const keyWord = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  /* const users = await UserModel.find(keyWord).find({
    _id: { $ne: req.user._id },
  }); */
  const users = await UserModel.find(keyWord);

  
  res.status(200).send({ message: users });
};

export default {
  registerUser,
  loginUser,
  gelAllUsers,
};
