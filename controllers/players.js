const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags['Players']
  try {
    const players = await mongodb
      .getDatabase()
      .db()
      .collection("players")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(players);
  } catch (err) {
    console.error("Error fetching players:", err);
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags['Player']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid player id to find the pokemon.");
    }

    const playerId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("players")
      .find({ _id: playerId })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result[0]);
  } catch (err) {
    console.error("Error in getSingle player:", err);
    res.status(400).json({ message: err.message });
  }
};

const createPlayer = async (req, res) => {
  //#swagger.tags['Players']
  const player = {
    name: req.body.name,
    club: req.body.club,
    position: req.body.position,
    age: req.body.age,
    goals: req.body.goals,
    assists: req.body.assists,
    nationality: req.body.nationality,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("players")
    .insertOne(player);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while inserting the player");
  }
};

const updatePlayer = async (req, res) => {
  //#swagger.tags['Players']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid player id to update a player.");
  }
  const playerId = new ObjectId(req.params.id);
  const player = {
    name: req.body.name,
    club: req.body.club,
    position: req.body.position,
    age: req.body.age,
    goals: req.body.goals,
    assists: req.body.assists,
    nationality: req.body.nationality,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("players")
    .replaceOne({ _id: playerId }, player);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the player");
  }
};

const deletePlayer = async (req, res) => {
  //#swagger.tags['Players']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid player id to delete a player.");
  }
  const playerId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("players")
    .deleteOne({ _id: playerId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the player");
  }
};

module.exports = {
  getAll,
  getSingle,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
