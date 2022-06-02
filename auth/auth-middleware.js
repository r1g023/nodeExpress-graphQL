require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  generateToken,
  restrictedUser,
  checkRole,
};

function generateToken(user) {
  let payload = {
    subID: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
  const options = {
    expiresIn: "24h",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
}

function restrictedUser() {
  return (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log("verify token error----->", err);
          res.json({ message: "please verify token, its incorrect" });
        } else {
          console.log("decoded token verify correct---->", decoded);
          req.decodedToken = decoded;
          next();
        }
      });
    } else {
      res.json({
        token_error:
          "please verify credentials and login or register on /graphql/auth endpoint",
      });
    }
  };
}

function checkRole(user) {
  return (req, res, next) => {
    if (req.decodedToken.role === user) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "you're not an admin, don't have access to this" });
    }
  };
}
