import { Sequelize } from "sequelize";
import con from "../config";
import userModel from "./user";
import taskModel from "./task";

const seq: Sequelize = new Sequelize(
  con.development.database as string,
  con.development.user as string,
  con.development.password as string,
  {
    host: con.development.host,
    dialect: "postgres",
  }
);

export interface DB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  User: ReturnType<typeof userModel>;
  Task: ReturnType<typeof taskModel>;
}

const db: DB = {
  sequelize: seq,
  Sequelize,
  User: userModel(seq),
  Task: taskModel(seq),
};

db.User.hasMany(db.Task, { as: "tasks" });
db.Task.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user",
});

export default db;
