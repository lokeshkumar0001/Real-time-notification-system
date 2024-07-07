const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const { AppError } = require("../utils/errorThrower.js");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if required fields are empty
  if (!username || !email || !password) {
    return next(
      new AppError("Username, email, and password mare required", 400)
    );
  }

  try {
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    res.status(201).json({ success: true, user: savedUser });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token });
    } else {
      return next(new AppError("Invalid credential", 401));
    }
  } catch (err) {
    next(err);
  }
};
