import ChatModel from "./../models/chat.model.js";
import handleError from "../utils/errorHandler.js";
import UserModel from "../models/user.model.js";
import chatModel from "./../models/chat.model.js";

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

  isChat = await UserModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name imgUrl email",
  });

  /*  const existingChat = await ChatModel.findOne({
    $and: [{ users: { $all: [adminId, userId] } }, { isGroupChat: false }],
  }); */

  if (isChat.length > 0) {
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
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password");
    res.status(200).send({ existingChat });
  } catch (error) {
    console.log(error);
  }
};

const createGroupChat = async (req, res) => {
  const userId = req.params.id;
  const data = req.body.data
  
  if (!data.users || !data.name) {
    return res.status(400).send({ message: "please fill all the felids" });
  }

  var users = data.users;
  console.log(users)
  if (users.length < 2) {
    return res.status(400).send("Group Chat need to more than two users!");
  }
  users.push(userId);
  try {
    const groupChat = await chatModel.create({
      chatName: data.name,
      users,
      isGroupChat: true,
      groupAdmin: userId,
    });
    const fullGroupChat = await chatModel
      .findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

      res.status(200).json(fullGroupChat)
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

const getActiveUsers = async () => {};

const deleteChatById = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteData = await ChatModel.deleteOne({ _id: userId });
    res.status(200).send({ message: "chat delete successfully!" });
  } catch (error) {
    res.status(500).send({ message: "internal server error!" });
  }
};

export default {
  createChat,
  fetchChat,
  getActiveUsers,
  deleteChatById,
  createGroupChat,
};
