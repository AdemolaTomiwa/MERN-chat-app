import express from 'express';
import { auth } from '../middleware/auth.js';

const router = express.Router();

import Chat from '../models/chatModel.js';
import User from '../models/userModel.js';

// Create or fetch a chat
// POST @/api/chats
// Private
router.post('/', auth, async (req, res) => {
   try {
      const userId = req.body.id;

      if (!userId) return res.status(400).json({ msg: 'An error occured!' });

      var isChat = await Chat.find({
         isGroupChat: false,
         $and: [
            {
               users: { $elemMatch: { $eq: req.user.id } },
            },
            {
               users: { $elemMatch: { $eq: userId } },
            },
         ],
      })
         .populate('users', '-password')
         .populate('latestMessage');

      isChat = await User.populate(isChat, {
         path: 'latestMessage.sender',
         select: 'name, email, picture',
      });

      if (isChat.length > 0) {
         res.status(200).json(isChat[0]);
      } else {
         var newChat = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user.id, userId],
         };

         try {
            const createdChat = await Chat.create(newChat);
            const fullChat = await Chat.findOne({
               _id: createdChat._id,
            }).populate('users', '-password');
            res.status(201).json(fullChat);
         } catch (err) {
            res.status(400).json({ msg: 'An error occured!' });
         }
      }
   } catch (err) {
      res.status(400).json({ msg: 'An error occured!' });
   }
});

export default router;
