const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags['Premier League Clubs']
  try {
    const premierLeagueClubs = await mongodb
      .getDatabase()
      .db()
      .collection("premierLeague")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(premierLeagueClubs);
  } catch (err) {
    console.error("Error fetching Premier League Clubs:", err);
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags['Premier League']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Must use a valid club id to find the club.");
    }

    const premierLeagueClubId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("premierLeague")
      .find({ _id: premierLeagueClubId })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result[0]);
  } catch (err) {
    console.error("Error in getSingle club:", err);
    res.status(400).json({ message: err.message });
  }
};

const createPremierLeagueClub = async (req, res) => {
  //#swagger.tags['Premier League']
  try {
    const premierLeagueClub = {
      name: req.body.name,
      position: req.body.position,
      wins: req.body.wins,
      draws: req.body.draws,
      losses: req.body.losses,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("premierLeague")
      .insertOne(premierLeagueClub);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while inserting the club");
    }
  } catch (err) {
    console.error("Error creating Premier League Club:", err);
    res.status(500).json({ message: err.message });
  }
};

const updatePremierLeagueClub = async (req, res) => {
  //#swagger.tags['Premier League']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid club id to update a club.");
    }
    const premierLeagueClubId = new ObjectId(req.params.id);
    const premierLeagueClub = {
      name: req.body.name,
      position: req.body.position,
      wins: req.body.wins,
      draws: req.body.draws,
      losses: req.body.losses,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("premierLeague")
      .replaceOne({ _id: premierLeagueClubId }, premierLeagueClub);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while updating the club");
    }
  } catch (err) {
    console.error("Error updating Premier League Club:", err);
    res.status(500).json({ message: err.message });
  }
};

const deletePremierLeagueClub = async (req, res) => {
  //#swagger.tags['Premier League']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid club id to delete a club.");
    }
    const premierLeagueClubId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("premierLeague")
      .deleteOne({ _id: premierLeagueClubId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while deleting the club");
    }
  } catch (err) {
    console.error("Error deleting Premier League Club:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createPremierLeagueClub,
  updatePremierLeagueClub,
  deletePremierLeagueClub,
};
