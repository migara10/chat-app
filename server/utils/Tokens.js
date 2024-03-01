import jwt from "jsonwebtoken";

const generateToken = async (user, key, time) => {
  const token = jwt.sign({ userId: user._id }, key, {
    expiresIn: time,
  });
  return token;
};

export default generateToken;