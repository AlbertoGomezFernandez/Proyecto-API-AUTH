const mongoose = require("mongoose");
const Console = require("./console.model");

const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    console: { type: String, required: true },
    usersThatPlay: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true
  }
);



gameSchema.post('save', async function (doc) {
  await Console.updateOne({ name: doc.console }, { $addToSet: { games: doc._id } });
});


const Game = mongoose.model("Game", gameSchema);
module.exports = Game;