const validator = require("../helpers/validate");

saveLaLigaClub = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    position: "required|string",
    wins: "string",
    draws: "string",
    losses: "string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

savePremierLeagueClub = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    position: "required|string",
    wins: "string",
    draws: "string",
    losses: "string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

savePlayer = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    club: "required|string",
    position: "required|string",
    age: "required|string",
    goals: "required|string",
    assists: "required|string",
    nationality: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

saveManager = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    club: "required|string",
    nationality: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};
