import mongoose, { Schema } from "mongoose";
import validator from "validator";
import { hashSync, compareSync } from "bcrypt-nodejs";
import uniqueValidator from "mongoose-unique-validator";
import jwt from "jsonwebtoken";

import constants from "../config/constants";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: "{VALUE} is not a valid email"
    }
  },
  name: {
    type: String,
    required: [true, "Name is required!"],
    trim: true
  },
  password: {
    type: String,
    required: [true, "password is required!"],
    trim: true,
    minlength: [6, "Password need to be longer"]
  }
});

UserSchema.plugin(uniqueValidator, {
  message: "{VALUE} already taken!"
});

UserSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    this.password = this._hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authanticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign({ id: this._id }, constants.JWT_SECRET);
  },
  toJSON() {
    return {
      id: this._id,
      name: this.name,
      email: this.email
    };
  }
};

export default mongoose.model("User", UserSchema);
