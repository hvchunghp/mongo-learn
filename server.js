import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";
import initWebRoutes from "./router";
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

mongoose
  .connect(
    `mongodb://localhost:${process.env.PORT_MONGO}/${process.env.DATABASE_NAME}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database");
  });

app.listen(process.env.PORT, (request, respond) => {
  console.log(`Our server is live on ${process.env.PORT}. Yay!`);
});

initWebRoutes(app);
