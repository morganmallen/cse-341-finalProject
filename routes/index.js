const router = require("express").Router();
const passport = require("passport");

router.use("/", require("./swagger"));
router.use("/laLiga", require("./laLiga"));
router.use("/premierLeague", require("./premierLeague"));
router.use("/managers", require("./managers"));
router.use("/players", require("./players"));

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
