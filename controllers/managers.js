const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags['Managers']
  try {
    const managers = await mongodb
      .getDatabase()
      .db()
      .collection("managers")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(managers);
  } catch (err) {
    console.error("Error fetching managers:", err);
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags['Manager']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid manager id to find the pokemon.");
    }

    const managerId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("managers")
      .find({ _id: managerId })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "Manager not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result[0]);
  } catch (err) {
    console.error("Error in getSingle manager:", err);
    res.status(400).json({ message: err.message });
  }
};

const createManager = async (req, res) => {
  //#swagger.tags['Managers']
  try {
    const manager = {
      name: req.body.name,
      nationality: req.body.nationality,
      club: req.body.club,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("managers")
      .insertOne(manager);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while inserting the manager"
        );
    }
  } catch (err) {
    console.error("Error creating Player:", err);
    res.status(500).json({ message: err.message });
  }
};

const updateManager = async (req, res) => {
  //#swagger.tags['Managers']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid manager id to update a manager.");
    }
    const managerId = new ObjectId(req.params.id);
    const manager = {
      name: req.body.name,
      nationality: req.body.nationality,
      club: req.body.club,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("managers")
      .replaceOne({ _id: managerId }, manager);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the manager"
        );
    }
  } catch (err) {
    console.error("Error creating Player:", err);
    res.status(500).json({ message: err.message });
  }
};

const deleteManager = async (req, res) => {
  //#swagger.tags['Managers']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid manager id to delete a manager.");
    }
    const managerId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("managers")
      .deleteOne({ _id: managerId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the manager"
        );
    }
  } catch (err) {
    console.error("Error deleting Manager:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createManager,
  updateManager,
  deleteManager,
};
