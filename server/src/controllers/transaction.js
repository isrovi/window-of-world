const { Transaction, Users } = require("../../models");

exports.addTransaction = async (req, res) => {
  try {
    const newTransaction = await Transaction.create({
      idUser: req.Users.id,
      accountNumber: req.body.accountNumber,
      transferProof: req.files.transferProof[0].filename,
      remainingActive: 0,
      userStatus: "Not Active",
      paymentStatus: "Pending",
    });

    let data = await Transaction.findOne({
      where: {
        id: newTransaction.id,
      },
    });

    data = {
      ...data,
      transferProof: process.env.FILE_PATH + data.transferProof,
    };

    res.send({
      status: "Success",
      data: {
        data,
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

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.update(req.body, {
      where: {
        id,
      },
    });

    let data = await Transaction.findOne({
      where: {
        id,
      },
      include: {
        model: Users,
        as: "User",
        attributes: {
          exclude: ["email", "password", "role", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    data = {
      ...data.dataValues,
      transferProof: process.env.FILE_PATH + data.transferProof,
    };

    res.send({
      status: "Success",
      data: {
        transaction: data,
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

exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    let data = await Transaction.findOne({
      where: {
        id,
      },
      include: {
        model: Users,
        as: "User",
        attributes: {
          exclude: ["email", "password", "role", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      transferProof: process.env.FILE_PATH + data.transferProof,
    };

    res.send({
      status: "Success",
      data: {
        transaction: data,
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

exports.getTransactions = async (req, res) => {
  try {
    let data = await Transaction.findAll({
      include: {
        model: Users,
        as: "User",
        attributes: {
          exclude: ["email", "password", "role", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        transferProof: process.env.FILE_PATH + item.transferProof,
      };
    });

    res.send({
      status: "Success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
