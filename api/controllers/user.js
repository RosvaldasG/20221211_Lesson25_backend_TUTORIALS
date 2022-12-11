const bcrypt = require("bcryptjs");
const { rawListeners } = require("../models/userModel"); //neaišku kam
const jwt = require("jsonwebtoken");

const UserSchema = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

// CREATE USER---------------------------------

module.exports.CREATE_USER = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10); // užkoduojama slaptažodį

  const user = new UserSchema({
    email: req.body.email,
    password: hashedPassword,
  });

  const userCheck = await UserSchema.findOne({ email: req.body.email });

  if (userCheck === null) {
    // tikrina ar yra toks USER
    user // jei tokio nėra tai įrašo
      .save()
      .then((result) => {
        console.log(result);
        return res
          .status(200)
          .json({ response: "User was created succses", result });
      })
      .catch((err) => {
        console.log("err", err);
        res.status(500).json({ responce: "Failed" });
      });
  } else {
    // jei toks yra gražina klaidą
    console.log("toks vartotojas yra");
    res.status(404).json({ responce: "user already exist" });
  }
};

// Login------------------------------------------

module.exports.USER_LOGIN = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    console.log(user);

    if (isPasswordMatch) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        { algorythm: "RS256" }
      );

      return res
        .status(200)
        .json({ status: "login successfull", jwt_token: token });
    }
    return res.status(401).json({ status: "login failed" });
  } catch (err) {
    console.log("req.body", req.body);

    console.log("err", err);
    return res.status(401).json({ status: "login failed" });
  }
};

// GET NUMBER of ALL USERS---------------------------------

module.exports.GET_ALL_USERS = function (req, res) {
  UserSchema.find().then((results) => {
    // console.log(results);

    const countUsers = results.reduce((counter, obj) => {
      // suskaičiuoja USERS pagal _id
      if (obj._id) counter += 1;
      return counter;
    }, 0);
    // console.log(countUsers);
    return res.status(200).json({ totalUsers: countUsers });
  });
};
