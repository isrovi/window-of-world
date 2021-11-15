const { Users, Transaction, Profile } = require("../../models");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userExist = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExist) {
      return res.status(400).send({
        status: "failed",
        message: "Email already exist",
      });
    }

    const newUser = await Users.create({
      email: req.body.email,
      password: hashedPassword,
      fullName: req.body.fullName,
      role: req.body.role,
    });

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);

    res.status(200).send({
      status: "Success",
      data: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const data = await Users.findAll({
      attributes: {
        exclude: ["password", "role", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Success",
      data: {
        users: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Users.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Profile,
          as: "profile",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Transaction,
          as: "transaction",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["password", "role", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Success",
      data: {
        user: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await Users.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "Success",
      message: `User id: ${id} deleted`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
