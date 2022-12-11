const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const {
  CREATE_USER,
  USER_LOGIN,
  GET_ALL_USERS,
} = require("../controllers/user");

router.post("/createUser", CREATE_USER);

router.post("/login", USER_LOGIN);

router.get("/getUsers", auth, GET_ALL_USERS);

module.exports = router;
