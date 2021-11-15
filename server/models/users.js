'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Transaction, {
        as: "transaction",
        foreignKey: {
          name: "idUser"
        }
      });
      Users.hasOne(models.Profile, {
        as: "profile",
        foreignKey: {
          name: "idUser"
        }
      });
      Users.hasMany(models.bookList, {
        as: "booklist",
        foreignKey: {
          name: "idUser"
        }
      })
    }
  };
  Users.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};