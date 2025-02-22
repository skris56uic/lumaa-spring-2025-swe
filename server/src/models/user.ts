import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcryptjs";

export interface UserAttributes {
  id?: number;
  username: string;
  password: string;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

export default (seq: Sequelize) => {
  const User = seq.define<UserInstance>("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.beforeCreate(async (user: UserInstance) => {
    user.password = await bcrypt.hash(user.password, 10);
  });
  return User;
};
