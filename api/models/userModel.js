const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, min: 3 },
  password: { type: String, required: true, min: 3 },
  reg_timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User_Lesson25", userSchema);
