const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (!token) return res.status(401).json("Access Denied");
  jwt.verify(token, process.env.PASSCODE, (err, user) => {
    if (err) return res.status(403).json("Invalid Token");
    req.user = user;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Admin Only");
    }
  });
};

module.exports = { verifyToken, verifyAdmin };
