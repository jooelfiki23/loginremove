const mongoose = require("mongoose");
const { type } = require("os");

const usernewf = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const usernewff = mongoose.model("usern", usernewf);

module.exports = usernewff;
