import express from 'express'
import { deleteUser, test, updateUser } from '../controller/user.controller.js';
import { verify } from '../utils/verify.js';

const router = express.Router();
 
router.get('/' , test)
router.post('/update/:id', verify, updateUser )
router.delete('/delete/:id', verify, deleteUser )

export default router;