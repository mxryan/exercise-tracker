const mongoose = require("mongoose");
const ExerciseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: "An exercise description is required"
  }, 
  duration: {
    type: Number,
    min: 1,
    max: 1440,
    required: "An exercise duration is required"
  },
  date: {
    type: Date,
    required: "A valid exercise date is required"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: "A user ID is required"
  }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;