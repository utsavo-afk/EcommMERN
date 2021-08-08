const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const config = require("./../configuration/config");
const User = require("./../models/user.model");
const logger = require("./../utils/helpers/logger");

const signin = async (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({ error: "Enter a valid Email" });
  }
  if (!req.body.password)
    return res.status(400).send({ error: "Enter a valid Password" });
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    if (!(await user.authenticate(req.body.password))) {
      return res.status(401).send({
        error: "Authentication Failed, email and password do not match",
      });
    }
    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: "12h",
    });
    return res.status(200).send({
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

const isAuthenticated = expressJwt({
  secret: config.jwtSecret,
  requestProperty: "auth",
  algorithms: ["HS256"],
});

const isAuthorized = (req, res, next) => {
  const authorized =
    req.profile &&
    req.auth &&
    req.profile._id.toString() === req.auth._id.toString();
  if (!authorized) {
    return res.status(403).send({ error: "Not Authorized" });
  }
  next();
};

const isAdmin = (req, res, next) => {
  try {
    if (!req.profile.isAdmin) throw error;
    next();
  } catch (error) {
    return res.status(403).send({ error: "Access Denied" });
  }
};

module.exports = { signin, isAuthenticated, isAuthorized, isAdmin };
