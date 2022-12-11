const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const {
  CREATE_TUTORIALS,
  GET_MY_TUTORIALS,
  GET_TUTORIALS_NOT_PRIVATE,
  GET_ALL_TUTORIALS,
  //   USER_LOGIN,
  //   GET_ALL_USERS,
} = require("../controllers/tutorials");

router.post("/createTutorials", auth, CREATE_TUTORIALS);

router.get("/getMyTutorials", auth, GET_MY_TUTORIALS);

router.get("/getTutorialsNotPrivate/", GET_TUTORIALS_NOT_PRIVATE);

router.get("/getAllTutorials/", auth, GET_ALL_TUTORIALS);

// router.post("/login", USER_LOGIN);

// router.get("/getUsers", auth, GET_ALL_USERS);

module.exports = router;
