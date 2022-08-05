import express from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

// Login a User
// API @/api/auth
// Public
router.post('/', async (req, res) => {
   try {
      const { email, password } = req.body;

      // Simple Validation
      if (!email || !password)
         return res.status(400).json({ msg: 'Please enter all fields!' });

      // Check if user does not exist in database
      const user = await User.findOne({ email });

      if (!user)
         return res
            .status(409)
            .json({ msg: `User does not exist! Please register now!` });

      // Compare password
      bcrypt.compare(password, user.password).then((isMatch) => {
         if (!isMatch)
            return res.status(409).json({ msg: 'Invalid credentials!' });

         // Continue
         const token = generateToken(user._id);
         res.status(200).json({
            user: {
               id: user._id,
               name: user.name,
               email: user.email,
               picture: user.picture,
            },
            token,
         });
      });
   } catch (err) {
      res.status(400).json({ msg: 'An error occured!' });
   }
});

export default router;
