const { User } = require("../config/dbConnect");
const {
  userRegisterValidation,
  userLoginValidation,
} = require("../utils/validation");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    // Validate user input
    const { error } = userRegisterValidation.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }
    const { name, email, password } = req.body;

    // Check if email already exists

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw Error("Email already in use");
    }
    // Hash the password before saveing in db
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password });

    res.status(201).json({ message: "User Successfully Registerd" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // Validate user input
    const { error } = userLoginValidation.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }
    const { email, password } = req.body;

    // Check if email not exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw Error("Invalid credentials");
    }
    // Compare the password
    const comparePassword = await bcrypt.compare(password, user.password);

    res.status(201).json({ message: "User Successfuly Login", data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: "User Successfully LogOut" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser };
