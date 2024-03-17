const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// creates a new user
const create = async ({ fullName, email, password }) => {
  try {
    if (await User.findOne({ email: email })) {
      return [false, "user already exists, kindly log in."];
    }
    const hash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      fullName: fullName,
      email: email,
      password: hash,
    });
    if (await user.save()) {
      return [true, user];
    }
  } catch (err) {
    return [false, err];
  }
};

/* Return user with specified id */
const getById = async (id) => {
  const user = await User.findById(id);
  return user;
};

/* Return user with specified email */
const getByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};

/* Return all users */
const getAll = async () => {
  return await User.find();
};


module.exports = {
  create,
  getById,
  getByEmail,
  getAll,
};