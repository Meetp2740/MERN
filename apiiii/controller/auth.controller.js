import User from '../model/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

export const Signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const SignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const valideUser = await User.findOne({ email });
    if (!valideUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, valideUser.password);
    if (!validPassword) return next(errorHandler(401, "Incorrect Password"));
    const token = jwt.sign({ id: valideUser._id }, process.env.SECRET_KEY)
    const { password: hashedPassword, ...rest } = valideUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(valideUser._doc)
  }
  catch (err) {
    next(err)
  }
};

export const Google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
      const expiryDate = new Date(Date.now() + 3600000);
      res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(user)
    } else {
      const generatePassword = Math.random().toString(36).slice(-8);
      const { username, email, photo } = req.body;
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({ username, email, password: hashedPassword, profileImage: photo });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY)
      const expiryDate = new Date(Date.now() + 3600000);
      res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(newUser)
    }
  } catch (error) {
      next(error)
  }
}

export const signOut = (res, req) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};