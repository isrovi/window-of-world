const { bookList, Books, Users } = require("../../models");

exports.addBookList = async (req, res) => {
  try {
    const newBookList = await bookList.create({
      idBook: req.body.idBook,
      idUser: req.Users.id,
    });

    res.send({
      status: "Success",
      data: {
        idBook: newBookList.idBook,
        idUser: newBookList.idUser,
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

exports.getBookLists = async (req, res) => {
  try {
    let data = await bookList.findAll({
      where: {
        idUser: req.Users.id,
      },
      include: {
        model: Books,
        as: "book",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    data = JSON.parse(JSON.stringify(data));
    data = data.map((item) => {
      return {
        ...item,
        image: process.env.FILE_PATH + item.image,
      };
    });

    res.send({
      status: "success",
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
