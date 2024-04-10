import messageModel from "../models/message.model.js";
import userModel from "../models/user.model.js";

const sendMessage = async (req, res) => {
  const { content, userId } = req.body;
  const { chatId } = req.params.chatId;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.status(400).send("Invalid data passed into request");
  }
  var newMessage = {
    sender: userId,
    content,
    chat: chatId,
  };
  try {
    var message = await messageModel.create(newMessage);

    message = await message.populate("sender", "name imgUrl")
    message = await message.populate("chat")
    message = await userModel.populate(message,{ path: "chat.users", select: "name imgUrl email"})


  } catch (error) {
    console.log(error);
  }
};
const allMessages = async () => {};

export default {
  sendMessage,
  allMessages,
};
