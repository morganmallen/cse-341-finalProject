const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags['La Liga Clubs']
  try {
    const laLigaClubs = await mongodb
      .getDatabase()
      .db()
      .collection("laLiga")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(laLigaClubs);
  } catch (err) {
    console.error("Error fetching La Liga Clubs:", err);
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags['La Liga']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Must use a valid club id to find the club.");
    }

    const laLigaClubId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("laLiga")
      .find({ _id: laLigaClubId })
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

const createLaLigaClub = async (req, res) => {
  //#swagger.tags['La Liga']
  try {
    const laLigaClub = {
      name: req.body.name,
      position: req.body.position,
      wins: req.body.wins,
      draws: req.body.draws,
      losses: req.body.losses,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("laLiga")
      .insertOne(laLigaClub);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while inserting the club");
    }
  } catch (err) {
    console.error("Error creating La Liga Club:", err);
    res.status(500).json({ message: err.message });
  }
};

const updateLaLigaClub = async (req, res) => {
  //#swagger.tags['La Liga']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid club id to update a club.");
    }
    const laLigaClubId = new ObjectId(req.params.id);
    const laLigaClub = {
      name: req.body.name,
      position: req.body.position,
      wins: req.body.wins,
      draws: req.body.draws,
      losses: req.body.losses,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("laLiga")
      .replaceOne({ _id: laLigaClubId }, laLigaClub);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while updating the club");
    }
  } catch (err) {
    console.error("Error updating La Liga Club:", err);
    res.status(500).json({ message: err.message });
  }
};

const deleteLaLigaClub = async (req, res) => {
  //#swagger.tags['La Liga']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid club id to delete a club.");
    }
    const laLigaClubId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("laLiga")
      .deleteOne({ _id: laLigaClubId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while deleting the club");
    }
  } catch {
    console.error("Error deleting La Liga Club:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createLaLigaClub,
  updateLaLigaClub,
  deleteLaLigaClub,
};
