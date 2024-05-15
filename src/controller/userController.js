const { Users } = require("../db/models");

const create = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const model = await Users.create({ fullname, email, password });
    res.status(201).json({
      message: "user's created successfully!",
      user: {
        id: model.dataValues.id,
        fullname: model.dataValues.fullname,
        email: model.dataValues.email,
      },
      createdAt: model.dataValues.createdAt,
      updatedAt: model.dataValues.updatedAt,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { fullname, email, password } = req.body;
  try {
    const user = await Users.findOne({ where: { id } });
    const model = await user.update({
      fullname,
      email,
      password,
    });
    res.status(201).json({
      message: "user's updated successfully!",
      user: {
        id: model.dataValues.id,
        fullname: model.dataValues.fullname,
        email: model.dataValues.email,
      },
      createdAt: model.dataValues.createdAt,
      updatedAt: model.dataValues.updatedAt,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.findOne({ where: { id } });
    await Users.destroy({ where: { id } });
    res.status(200).json({
      message: `user with an id ${id} and name ${user.dataValues.fullname} is deleted!`,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const show = async (req, res) => {
  try {
    const model = await Users.findAll();
    console.log(model);
    res.status(200).json({
      message: "users are retrieved successfully!",
      users: model,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const index = async (req, res) => {
  const id = req.params.id;
  try {
    const model = await Users.findByPk(id);
    if (!model) throw Error("user's not found");
    res.status(200).json({
      message: "user's retrieved successfully!",
      user: model,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = { create, update, remove, show, index };
