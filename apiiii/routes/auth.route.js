import express from 'express'
import {Google, Signup, signOut, SignIn} from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup', Signup)
router.post('/signin', SignIn)
router.post('/google', Google)
router.get('/signout' , signOut)

export default router;