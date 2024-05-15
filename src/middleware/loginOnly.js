const jwt = require("jsonwebtoken");

const loginOnly = (req, res, next) => {
  try {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.ACCESS_SECRET_KEY
    );
    next();
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
};

module.exports = loginOnly;
