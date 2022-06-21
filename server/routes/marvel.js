import express from 'express';
import { getRandomChar } from '../controllers/marvel.js';
import { backFill } from '../scripts/backfill-db/index.js';

const marvelRouter = express.Router();

marvelRouter.get('/random', getRandomChar)

marvelRouter.post('/backfill', backFill)

export default marvelRouter