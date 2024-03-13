import express from 'express';
import  chats  from './data/data.js';
import dotenv from 'dotenv';
import cors from "cors";
import connectToDatabase from './database/connection.js';

import user from './Router/userRoute.js';
import chat from './Router/chatRouter.js';

dotenv.config();




const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("API works");
});

app.get('/chats', (req, res) => {
    res.send(chats);
});

app.use('/user', user);
app.use('/chat', chat);

app.get('/chats/:id', (req, res) => {
    const chat = chats.find(data => data._id === req.params.id);

    if (!chat) {
        res.status(404).send("Chat not found");
        return;
    }

    res.send(chat);
});

app.listen(PORT, () => console.log(`Server started on: ${PORT}`));
connectToDatabase();