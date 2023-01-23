/*
GET     /despesas     -> Returns all expenses
POST    /despesas     -> Insert new expenses
GET     /despesas/:id -> Returns a single expense
PUT     /despesas/:id -> Change a single expense
DELETE  /despesas/:id -> Delete a single expense

POST    /auth         -> Authentication (token generation)
*/

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;
const app = express();

const despesasRouter = require("./routes/despesas");
const auth = require("./routes/auth");

const createDefaultUser = require("./utils/createUser");

dotenv.config({ path: "./.env" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/despesas", despesasRouter);
app.use("/auth", auth);

const connDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_ACCESS);

    createDefaultUser();
    app.listen(port, () => {
      console.log("Server running on port: " + port);
    });
  } catch (e) {
    console.log("It wasn't possible to connect on port: " + port);
  }
};

connDB();
