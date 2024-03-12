import UserModel from "./../models/user.model.js";
import handleError from "../utils/errorHandler.js";
import generateToken from "../utils/Tokens.js";
import bcrypt from "bcrypt";
import cloudinaryService from "./../utils/cloudinaryService.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, file } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      imgUrl: file || "avatar.jpg",
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    const publicId = req.body.public_id;

    if (!publicId) {
      return res
        .status(400)
        .json({ success: false, message: "Public ID is required." });
    }

    await cloudinaryService(publicId); // delete cloudinary image
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

const getAllUsers = async (req, res) => {
  try {
    const userId = req.query.userId;
    const search = req.query.search || ""; // If search parameter is not provided, default to empty string
    const keyWord = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } }, // Case-insensitive search for name
            { email: { $regex: search, $options: "i" } }, // Case-insensitive search for email
          ],
        }
      : {};
    const users = await UserModel.find(keyWord).find({
      _id: { $ne: userId },
    });
    // const users = await UserModel.find(keyWord);

    res.status(200).send(users);
  } catch (error) {
    handleError(error, res); // get error messages
  }
};

export default {
  registerUser,
  loginUser,
  getAllUsers,
};
