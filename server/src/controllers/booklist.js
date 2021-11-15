const { bookList, Books } = require("../../models");

exports.addBookList = async (req, res) => {
  try {
    const newBookList = await bookList.create({
      idUser: req.Users.id,
      idBook: req.body.idBook,
    });

    let data = await bookList.findOne({
      where: {
        id: newBookList.id,
      },
    });
    res.send({
      status: "success",
      data: {
        data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getBookList = async (req, res) => {
  try {
    let data = await bookList.findAll({
      where: {
        idUser: req.Users.id,
      },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt"],
      },
      include: {
        model: Books,
        as: "book",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        book: {
          id: item.book.id,
          image: process.env.FILE_PATH + item.book.image,
          title: item.book.title,
          author: item.book.author,
        },
      };
    });

    res.send({
      status: "success",
      data: {
        data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};
