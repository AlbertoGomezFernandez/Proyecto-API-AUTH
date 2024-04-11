const express = require("express");
const { connectDB } = require("./src/config/db");
const gameRouter = require("./src/routes/game.routes");
const consoleRouter = require("./src/routes/console.routes");
const userRouter = require("./src/routes/user.routes");

require("dotenv").config();


const app = express();
const PORT = 3000;


connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/games", gameRouter);
app.use("/consoles", consoleRouter);
app.use("/users", userRouter);



app.listen(PORT, () => console.log(`http://localhost:${PORT}`));