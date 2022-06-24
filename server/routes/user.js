import express from 'express';
import { getUser, createUser, updateStreak } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.get('/:email/get-authed-user', getUser);
userRouter.post('/new-user', createUser);
userRouter.patch('/:email/update-streak', updateStreak);

export default userRouter