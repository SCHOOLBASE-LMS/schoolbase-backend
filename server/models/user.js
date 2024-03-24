const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { 
      type: "String",
      required: true 
    },
    lastName: { 
      type: "String",
      required: true 
    },
    middleName: {
      type: "String",
    },
    dateOfBirth: {
      type: "Date",
    },
    gender: {
      type: "String",
      enum: ["male", "female"],
    },
    email: { 
      type: "String", 
      unique: true,
      index: true, 
    },
    password: {
       type: "String" 
    },
    address: {
       street: String,
       city: String,
       state: String,
       zipCode: String
    },
    religion: {
      type: "String"
    },
    stateOfOrigin: {
      type: "String",
    },
    nationality: {
      type: "String"
    },
    maritalStatus: {
      type: "String",
    },
    phoneNumber: {
      type: "String",
    },

  },

  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;
