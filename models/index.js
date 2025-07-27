import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import process from "process";
import { fileURLToPath, pathToFileURL } from "url";
import configFile from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configFile[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Dynamic import file model
const modelFiles = fs.readdirSync(__dirname).filter(
  (file) =>
    file !== basename &&
    file.endsWith(".js") &&
    !file.endsWith(".test.js")
);

for (const file of modelFiles) {
  const filePath = path.join(__dirname, file);
  const moduleUrl = pathToFileURL(filePath).href;
  const { default: modelFn } = await import(moduleUrl);
  const model = modelFn(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// Associate jika ada relasi
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
