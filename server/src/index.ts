import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Sequelize } from "sequelize-typescript";

import config from "./config";
import userRouter from "./routes/user.route";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("assets"));
app.use("/users", userRouter);

const sequelize = new Sequelize({
  dialect: "sqlite",
  database: "movies",
  storage: __dirname + "user.db",
  models: [__dirname + "/models"],
});

(async () => {
  await sequelize.sync({ force: false });
})();

app.listen(config.port, () => {
  console.log(`The server is running on port ${config.port}.`);
});
