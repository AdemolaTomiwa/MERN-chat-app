import express from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Register a new User
// POST @/api/users
// Public
router.post('/', async (req, res) => {
   try {
      const { name, email, password, picture } = req.body;

      // Simple Validation
      if (!name || !email || !password)
         return res.status(400).json({ msg: 'Please enter all fields!' });

      if (password.length <= 5)
         return res
            .status(400)
            .json({ msg: 'Password must be at least 6 characters long!' });

      // Check if user already exist in database
      const userExist = await User.findOne({ email });

      if (userExist)
         return res
            .status(409)
            .json({ msg: `User already exist! Please login!` });

      // Create user instance/object
      const newUser = new User({
         name,
         email,
         password,
         picture,
      });

      // Hash password
      bcrypt.genSalt(14, (err, salt) => {
         bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            // Save new user password to hash password
            newUser.password = hash;
            //   Save user to db
            newUser
               .save()
               .then((user) => {
                  const token = generateToken(user._id);
                  res.json({
                     user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        picture: user.picture,
                     },
                     token,
                  });
               })
               .catch((err) =>
                  res.status(400).json({ msg: 'An error occured!' })
               );
         });
      });
   } catch (err) {
      res.status(400).json({ msg: 'An error occured!' });
   }
});

// Get all Users except current user
// GET @/api/users?search=
// Private
router.get('/', auth, async (req, res) => {
   try {
      const keyword = req.query.search
         ? {
              $or: [
                 { name: { $regex: req.query.search, $options: 'i' } },
                 { email: { $regex: req.query.search, $options: 'i' } },
              ],
           }
         : {};

      const users = await User.find(keyword)
         .sort({ createdAt: -1 })
         .find({ _id: { $ne: req.user.id } });
      res.json(users);
   } catch (err) {
      res.status(400).json({ msg: 'An error occured!' });
   }
});

export default router;
