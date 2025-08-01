"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.hasMany(models.ProjectAttribute, {
        foreignKey: "projectId",
        as: "attributes", // opsional: alias untuk relasi
        onDelete: "CASCADE",
      });
    }
  }
  Project.init(
    {
      projectName: DataTypes.STRING,
      startDate: DataTypes.DATEONLY,
      endDate: DataTypes.DATEONLY,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
