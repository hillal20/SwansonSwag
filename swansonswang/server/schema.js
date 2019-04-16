const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const definition = {
  rating: {
    type: Number,
    required: true
  },
  quote: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
};

const options = {
  timestamps: true
};

const ratingSchema = new Schema(definition, options);
const ratingModel = mongoose.model("Rating", ratingSchema);

module.exports = ratingModel;
