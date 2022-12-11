const { text } = require("body-parser");
const mongoose = require("mongoose");

const tutorialsSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  title: { type: String, required: true, min: 255 },
  content: { type: String, required: true },
  private: { type: Boolean, required: true },
});

module.exports = mongoose.model("Tutorials_Lesson25", tutorialsSchema);
