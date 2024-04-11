const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const consoleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true }, games: [{ type: Schema.Types.ObjectId, ref: "Game" }]
  },
  {
    timestamps: true
  }
);



const Console = mongoose.model("Console", consoleSchema);
module.exports = Console;