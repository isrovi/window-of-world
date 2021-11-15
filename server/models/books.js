"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Books.hasMany(models.bookList, {
        as: "booklist",
        foreignKey: {
          name: "idBook",
        },
      });
    }
  }
  Books.init(
    {
      title: DataTypes.STRING,
      publicationDate: DataTypes.DATE,
      pages: DataTypes.INTEGER,
      author: DataTypes.STRING,
      isbn: DataTypes.STRING,
      about: DataTypes.TEXT,
      image: DataTypes.STRING,
      bookFile: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Books",
    }
  );
  return Books;
};
