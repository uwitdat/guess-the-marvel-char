import express from "express";
import pkg from 'body-parser';
import cors from 'cors';
import marvelRouter from "../routes/marvel.js";
import userRouter from "../routes/user.js";

const { json } = pkg;

const createApp = () => {
  const app = express();
  app.use(json({
    limit: '200mb'
  }

  ));
  app.use(cors('*'));

  app.get("/", (req, res) => {
    res.send("Hello World marvel!");
  });

  app.use('/characters', marvelRouter);
  app.use('/users', userRouter);


  return app;
}

export default createApp;