const UserModel = require("../models/user.model");

//get user by id
const getUserById = async (id, res) => {
  const user = await UserModel.findOne({ _id: id });
  if (user) {
    res.status(201).json({
      success: true,
      user,
    });
  }
};

module.exports = { getUserById };
