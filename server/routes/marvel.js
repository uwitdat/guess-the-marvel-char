import express from 'express';
import { getRandomChar } from '../controllers/marvel.js';
import { backFill } from '../scripts/backfill-db/index.js';
import { increaseBothTotals, increaseOneTotal } from '../controllers/totals.js';

const marvelRouter = express.Router();

marvelRouter.get('/random', getRandomChar);

marvelRouter.patch('/:id/increase', increaseOneTotal);

marvelRouter.patch('/:id/increase-both', increaseBothTotals);

marvelRouter.post('/backfill', backFill)

export default marvelRouter