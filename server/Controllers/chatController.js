import ChatModel from "./../models/chat.model.js";
import handleError from "../utils/errorHandler.js";

const createChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send({ message: "userId not valid" });
  }
  try {
  } catch (error) {
    handleError(error, res); // get error messages
  }
};

const fetchChat = async () => {};

export default {
  createChat,
  fetchChat,
};
