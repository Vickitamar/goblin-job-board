const User = require("../models/users");

exports.postUsers = async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  res.send("user is saved in DB successfully");
  //   res.json(user);
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
