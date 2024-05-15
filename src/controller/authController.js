const { Users } = require("../db/models");
const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  const accessToken = jwt.sign(data, process.env.ACCESS_SECRET_KEY, { expiresIn: "15m" });
  const refreshToken = jwt.sign(data, process.env.REFRESH_SECRET_KEY, { expiresIn: "1d" });

  return { accessToken, refreshToken };
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const model = await Users.findOne({ where: { email, password } });

    const { accessToken, refreshToken } = generateToken({
      id: model.dataValues.id,
      fullname: model.dataValues.fullname,
    });

    res.status(200).json({
      message: "login is successfull!",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const model = await Users.create({ fullname, email, password });

    const { accessToken, refreshToken } = generateToken({
      id: model.dataValues.id,
      fullname: model.dataValues.fullname,
    });

    res.status(201).json({
      message: "register is successfull!",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

const refreshToken = (req, res) => {
  const refreshTokenReq = req.body.refreshToken;
  try {
    const data = jwt.verify(refreshTokenReq, process.env.REFRESH_SECRET_KEY);
    const { accessToken, refreshToken } = generateToken({ id: data.id, fullname: data.fullname });

    res.status(200).json({
      message: "refresh token's created successfully!",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { login, register, refreshToken };
