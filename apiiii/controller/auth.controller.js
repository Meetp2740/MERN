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
    try{
      const valideUser = await User.findOne({ email });
      if(!valideUser) return next(errorHandler(404, "User not found"));
      const validPassword = bcryptjs.compareSync(password, valideUser.password);
      if(!validPassword) return next(errorHandler(401, "Incorrect Password"));
      const token = jwt.sign({ id : valideUser._id }, process.env.SECRET_KEY)
      const { password: hashedPassword, ...rest } = valideUser._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res.cookie('access_token' , token, { httpOnly : true, expires :expiryDate }).status(200).json(valideUser)
    }
    catch(err){
      next(err)
    }
};