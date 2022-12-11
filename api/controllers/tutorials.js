const bcrypt = require("bcryptjs");
const { rawListeners } = require("../models/tutorials"); //neaišku kam
const jwt = require("jsonwebtoken");

const tutorialsSchema = require("../models/tutorials");
const ObjectId = require("mongoose").Types.ObjectId;

//--------------------------------------

module.exports.CREATE_TUTORIALS = function (req, res) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).end();
  }

  const tokenId = jwt.verify(token, process.env.JWT_SECRET);
  req.body.id = tokenId.userId;

  const tutorial = new tutorialsSchema({
    user_id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    private: req.body.private,
  });

  tutorial.save().then((result) => {
    return res.status(200).json({
      statusMessage: "task was inserted successfully",
      result: result,
    });
  });
};

//-------------------------------------------------

module.exports.GET_MY_TUTORIALS = function (req, res) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).end();
  }
  const tokenId = jwt.verify(token, process.env.JWT_SECRET);
  req.body.id = tokenId.userId;
  tutorialsSchema.find({ user_id: req.body.id }).then((results) => {
    return res.status(200).json({ tutorials: results });
  });
};

module.exports.GET_TUTORIALS_NOT_PRIVATE = function (req, res) {
  tutorialsSchema.find({ private: "false" }).then((results) => {
    return res.status(200).json({ tutorials: results });
  });
};

module.exports.GET_ALL_TUTORIALS = function (req, res) {
  tutorialsSchema.find().then((results) => {
    return res.status(200).json({ tutorials: results });
  });
};
