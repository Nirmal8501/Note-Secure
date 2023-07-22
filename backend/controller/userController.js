const asyncHandler = require("express-async-handler"); //Handles async errors
const User = require("../models/userModel");
const generateToken = require("../utils/jwt");
// const mongoose = require("mongoose");

// POST /api/users/login
// for logging user in, its public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //if user is found, then we ll check for password else no need to check for pass and directly throw error

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials, Please Re-Enter");
  }
});

//route: POST /api/users/   {its public}
// For Registering User

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  //after taking above input from user, we will check if it already exists

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }

  //   if user doesnt exist then create a new user in db
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
    // res.send
  } else {
    res.status(400);
    throw new Error("Oops Error Occured");
  }
});

module.exports = { registerUser, authUser };
