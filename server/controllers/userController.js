const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  sendPasswordRest,
  sendEmailVerification,
} = require("../middlewares/mailer");

const createUser = async (req, res) => {
  try {
    let { name, email, password, phone } = req.body;
    console.log(req.body);
    if (!email || !password || !name || !phone) {
      return res.status(400).json("All fields are required");
    }

    email = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json("Please enter a valid email address");
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json(
          "Password must be at least 8 characters long and include at least one letter, one number and one special character"
        );
    }

    const existingUser = await User.findOne({
      email: { $regex: new RegExp("^" + email + "$", "i") },
    });
    if (existingUser) {
      return res
        .status(400)
        .json("User already exists. Try logging in or use another email.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword, phone });
    await newUser.save();

    res.status(201).json("User account created successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const sendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const token = jwt.sign({ email }, process.env.EMAIL_SECRET, {
      expiresIn: "1h",
    });

    const emailVerifyLink = `${process.env.BASE_URL}/verifyEmail/${token}`;

    const userEmail = email;
    const subject = "Verify your email address";
    const html = `<p>Your Account has been successfully created!</p><p> Click <a href="${emailVerifyLink}"> here</a> to verify your email</p><p><strong>Note:</strong> This link is valid for only 1 hour.</p>`;

    await sendEmailVerification(userEmail, subject, html);
    res.status(200).json({ message: "Email Sent Succssfully!" });
  } catch (err) {
    res.status(500).json("Email not sent", err.message);
    console.log(err.message);
  }
};

const verifyEmail = async (req, res) => {
  console.log("ran");
  const { token } = req.params;

  try {
    // verify and decode
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET);

    // get email from payload
    const userEmail = decoded.email;

    await User.findOneAndUpdate({ email: userEmail }, { emailVerified: true });

    res.status(200).json("Email Verified");
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(400)
        .json({ message: "Verification link has expired." });
    }
    res.status(400).json({ message: "Invalid verification link." });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User has no account with us");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json("Incorrect Password");

    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.PASSCODE,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.REFRESH_PASSCODE,
      { expiresIn: "1d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("User has been updated");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const forgotPassword = async (req, res) => {
  console.log("ran");
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(404)
      .json({ message: "An Error Occured, User not Found!" });

  // if user's email is found, a token is needed to complete the process

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.PASSWORD_RESET_SECRET,
    { expiresIn: "20m" }
  );

  // after creating the token we need a link that will redirect the user to the reset password after accepting that the user has an account with them
  const resetLink = `${process.env.BASE_URL}/reset-password/${token}`;

  const userEmail = email;
  const subject = "Reset Your Password";
  const html = `<p> Click <a href="${resetLink}">Here</a> to Reset your Password.<br>Your Link Expires in 20 mins</p>`;

  await sendPasswordRest(userEmail, subject, html);
  res.status(200).json({ message: "Email Sent Succssfully!" });
  console.log("Email Sent!");
};

const resetPassword = async (req, res) => {
  const { token } = req.params; // getting the token from the url
  const { password } = req.body; // getting the password form the form
  try {
    const decode = jwt.verify(token, process.env.PASSWORD_RESET_SECRET); // check if the token is correct

    const user = await User.findById(decode.id); // because the token is in the "decode", and the token is made with the user's id, the id can also be found in decode, so, we use decode to find the user's id

    if (!user) return res.status(404).json({ message: "User not Found!" }); // if id id not found, error code

    // if the id id found,the password needs to be hashed before stored
    user.password = await bcrypt.hash(password, 10); // hash passowrd
    await user.save(); //save password

    res.status(200).json({ message: "Success!" });
  } catch (error) {
    res.status(500).json({ message: "Password not set", error });
  }
};

const logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.json({ message: "Successfully logged out" });
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json("Your Account deleted successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  createUser,
  userLogin,
  deleteUser,
  logout,
  getUsers,
  getUserById,
  updateUser,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
