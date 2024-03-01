import express from 'express';
import userController from './../Controllers/userController.js';
import path from 'path';
import multer from "multer";

const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
  
  const upload = multer({ storage: storage });

const route = express.Router();

route.post('/register',upload.single("file"), userController.registerUser);
route.post('/login', userController.registerUser);

export default route;