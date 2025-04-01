const express = require("express");
const router = express.Router();

const laLigaClubsController = require("../controllers/laLiga");
const validation = require("../middleware/validate");

const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", laLigaClubsController.getAll);

router.get("/:id", laLigaClubsController.getSingle);

router.post(
  "/",
  isAuthenticated,
  validation.saveLaLigaClub,
  laLigaClubsController.createLaLigaClub
);

router.put(
  "/:id",
  isAuthenticated,
  validation.saveLaLigaClub,
  laLigaClubsController.updateLaLigaClub
);

router.delete("/:id", isAuthenticated, laLigaClubsController.deleteLaLigaClub);

module.exports = router;
