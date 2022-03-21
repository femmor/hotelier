import express from "express";
import { readdirSync } from "fs";
require("dotenv").config({ path: "./.env" });
import cors from "cors";
import mongoose from "mongoose";

const morgan = require("morgan");

const app = express();

// Database connection
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.DATABASE_URI, options)
  .then(() => console.log("Database connection established successfully..."))
  .catch(err => console.log(err.message));

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// route middleware
readdirSync("./routes").map(r => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
