const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true  },
  phone: { type: String, unique: true, required: true  },
  status: { type: Boolean, default: true },
  is_admin: { type: Boolean, default: false },
  registration_ip: { type: String },
  registration_date: { type: Date, default: Date.now },
  last_login_ip: { type: String, default: null },
  last_login_date: { type: Date, default: null },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);