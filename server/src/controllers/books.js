const { Books } = require("../../models");
const Joi = require("joi");

exports.getBooks = async (req, res) => {
  try {
    let data = await Books.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        image: process.env.FILE_PATH + item.image,
        bookFile: process.env.FILE_PATH + item.bookFile,
      }
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

exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await Books.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      image: process.env.FILE_PATH + data.image,
      bookFile: process.env.FILE_PATH + data.bookFile,
    };

    res.send({
      status: "Success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addBook = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    publicationDate: Joi.date().required(),
    pages: Joi.number().required(),
    author: Joi.string().required(),
    isbn: Joi.string().required(),
    about: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      status: "error",
      message: error.details[0].message,
    });
  }
  try {
    const createdData = await Books.create({
      title: req.body.title,
      publicationDate: req.body.publicationDate,
      pages: req.body.pages,
      author: req.body.author,
      isbn: req.body.isbn,
      about: req.body.about,
      image: req.files.image[0].filename,
      bookFile: req.files.bookFile[0].filename,
    });

    let data = await Books.findOne({
      where: {
        id: createdData.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data = {
      ...data.dataValues,
      image: process.env.FILE_PATH + data.image,
      bookFile: process.env.FILE_PATH + data.bookFile,
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

exports.updateBook = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    publicationDate: Joi.date().required(),
    pages: Joi.number().required(),
    author: Joi.string().required(),
    isbn: Joi.string().required(),
    about: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      status: "error",
      message: error.details[0].message,
    });
  }
  try {
    const { id } = req.params;
    const newData = req.body;
    
    let data = {
      ...newData,
      // image: req.file.filename,
      bookFile: req.file.filename
    }
    
    await Books.update(newData, {
      where: {
        id
      }
    });

    res.send({
      status: "Success",
      message: `Book id: ${id} Updated`,
      data: {
        data
      }
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    await Books.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "Success",
      message: `User id: ${id} Deleted`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
