const express = require("express");
const router = express.Router();

const managersController = require("../controllers/managers");
const validation = require("../middleware/validate");

const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", managersController.getAll);

router.get("/:id", managersController.getSingle);

router.post(
  "/",
  isAuthenticated,
  validation.saveManager,
  managersController.createManager
);

router.put(
  "/:id",
  isAuthenticated,
  validation.saveManager,
  managersController.updateManager
);

router.delete("/:id", isAuthenticated, managersController.deleteManager);

module.exports = router;
