'use strict';
// const {
//   Model
// } = require('sequelize');
import {Model} from "sequelize"
export default (sequelize, DataTypes) => {
  class projectTest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  projectTest.init({
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'projectTest',
  });
  return projectTest;
};