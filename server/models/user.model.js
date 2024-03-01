import mongoose from "mongoose";
import validator from "validator";

const { isEmail } = validator;

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: [true, "Email required"],
      lowercase: true,
      unique: true,
      validate: [isEmail, "Invalid Email format"],
    },
    password: {
      type: String,
      required: [true, "Password required"],
      minLength: [4, "Password must be 8 characters"],
    },
    pic: { type: String, default: "avatar.jpg" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
