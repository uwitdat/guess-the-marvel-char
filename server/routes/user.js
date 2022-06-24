import express from 'express';
import { getUser, createUser } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.get('/:email/get-authed-user', getUser);
userRouter.post('/new-user', createUser);

export default userRouter