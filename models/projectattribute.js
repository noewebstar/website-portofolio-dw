"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class ProjectAttribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProjectAttribute.belongsTo(models.Project, {
        foreignKey: "projectId",
        onDelete: "CASCADE",
      });
    }
  }
  ProjectAttribute.init(
    {
      projectId: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProjectAttribute",
    }
  );
  return ProjectAttribute;
};
