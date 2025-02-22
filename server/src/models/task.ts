import { DataTypes, Model, Sequelize } from "sequelize";

export interface TaskAttributes {
  id?: number;
  title: string;
  description?: string;
  isComplete: boolean;
  userId: number;
}

export interface TaskInstance extends Model<TaskAttributes>, TaskAttributes {}

export default (seq: Sequelize) => {
  const Task = seq.define<TaskInstance>("Task", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Task;
};
