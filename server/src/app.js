import express from "express";
import pkg from 'body-parser';
import cors from 'cors';
import marvelRouter from "../routes/marvel.js";

const { json } = pkg;

const createApp = () => {
  const app = express();
  app.use(json({
    limit: '50mb'
  }

  ));
  app.use(cors('*'));

  app.get("/", (req, res) => {
    res.send("Hello World marvel!");
  });

  app.use('/characters', marvelRouter);


  return app;
}

export default createApp;