const jwt = require("jsonwebtoken");
const User = require("../models/User");

const refreshAccessToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken)
    return res.status(401).json({ message: "Refresh token missing" });

  const refreshToken = cookies.refreshToken;

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_PASSCODE);

    const accessToken = jwt.sign(
      { id: decoded.id, email: decoded.email, isAdmin: decoded.isAdmin },
      process.env.PASSCODE,
      { expiresIn: "15m" }
    );

    const user = await User.findById(decoded.id).select("-password");

    res.json({ accessToken, user });
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

module.exports = { refreshAccessToken };
