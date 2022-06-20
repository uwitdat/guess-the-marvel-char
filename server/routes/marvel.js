import express from 'express';
import { getRandomChar } from '../controllers/marvel.js';

const marvelRouter = express.Router();

marvelRouter.get('/random', getRandomChar)

export default marvelRouter