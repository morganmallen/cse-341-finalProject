const express = require("express");
const router = express.Router();

const premierLeagueClubs = require("../controllers/premierLeague");
const validation = require("../middleware/validate");

const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", premierLeagueClubs.getAll);

router.get("/:id", premierLeagueClubs.getSingle);

router.post(
  "/",
  isAuthenticated,
  validation.savePremierLeagueClub,
  premierLeagueClubs.createPremierLeagueClub
);

router.put(
  "/:id",
  isAuthenticated,
  validation.savePremierLeagueClub,
  premierLeagueClubs.updatePremierLeagueClub
);

router.delete("/:id", isAuthenticated, premierLeagueClubs.deletePremierLeagueClub);

module.exports = router;
