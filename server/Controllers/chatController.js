import ChatModel from "./../models/chat.model.js";
import handleError from "../utils/errorHandler.js";
import UserModel from "../models/user.model.js";

const createChat = async (req, res) => {
  const { adminId, userId } = req.body;

  if (!userId) {
    return res.status(400).send({ message: "userId not valid" });
  }

  let isChat = await ChatModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: adminId } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  /* isChat = await UserModel.populate(isChat, {
    path: "latestMessage"
  }); */
  const existingChat = await ChatModel.findOne({
    $and: [{ users: { $all: [adminId, userId] } }, { isGroupChat: false }],
  });

  if (existingChat) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [adminId, userId],
    };

    try {
      const chatCreate = await ChatModel.create(chatData);

      const FullChat = await ChatModel.findOne({
        _id: chatCreate._id,
      }).populate("users", "-password");
      res.status(200).send(FullChat);
    } catch (error) {
      console.log(error);
    }
  }

  /* try {
  } catch (error) {
    handleError(error, res); // get error messages
  } */
};

const fetchChat = async (req, res) => {
  try {
    const userId = req.params.id;
    const existingChat = await ChatModel.find({
      $and: [{ users: { $in: [userId] } }],
    }).populate("users", "-password")
    .populate("latestMessage");;
    const filteredData = existingChat.filter(chat => chat.users.some(user => user._id === userId));
    return res.status(200).send({ existingChat });
  } catch (error) {
    console.log(error);
  }
};

const getActiveUsers = async () => {};

export default {
  createChat,
  fetchChat,
  getActiveUsers,
};
