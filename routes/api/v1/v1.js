import mongoose from "mongoose";
import express from "express";
let router = express.Router();

main().catch((err) => console.log(err));

let Unit;
let Deck;

async function main() {
  //Run mongo db locally with a command like:
  // Windows:
  //    mongod.exe --dbpath="c:\dev\mongodb\testdb"
  // Mac:
  //    brew services start mongodb-community@5.0
  const username = "info441";
  const password = "info441";
  await mongoose.connect(
    `mongodb+srv://${username}:${password}@info441.ufwdk.mongodb.net/sd2?retryWrites=true&w=majority`
  );
  console.log("connected to mongodb");

  const unitSchema = new mongoose.Schema({
    name: String,
    country: String,
    tagSet: [String],
    weapons: [String],
    concealmentBonus: Number,
    lowFlyingAltitude: Number,
    nearGroundFlyingAltitude: Number,
    actualHP: Number,
    displayedHP: Number,
    dangerousness: Number,
    visionRange: Number,
    opticalStrength: Number,
    autoCoverRange: Number,
    occupationRadius: Number,
    maxSpeed: Number,
    maxAcceleration: Number,
    maxDeceleration: Number,
    halfTurnTime: Number,
    vehicleSubType: String,
    isTransporter: Boolean,
    isPlane: Boolean,
    towable: Boolean,
  });

  Unit = mongoose.model("Unit", unitSchema);

  const deckSchema = new mongoose.Schema({
    title: String,
    units: [{ type: mongoose.Schema.Types.ObjectId, ref: "Unit" }],
  });
  Deck = mongoose.model("Deck", deckSchema);
}

// Get units which satisfy the query
router.get("/unit", async function (req, res, next) {
  let units = await Unit.find(req.query);
  res.json(units);
});

// get json data for a deck
router.get("/deck", async function (req, res, next) {
  let deck = await Deck.find({ _id: req.params });
  res.json(deck);
});
export default router;
