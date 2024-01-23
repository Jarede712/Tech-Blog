const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user", // 'users' table
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true, // Enables created_at and updated_at fields
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
