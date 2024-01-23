const Sequelize = require("sequelize");
const sequelize = require("../config/connection");

// Import the models
const User = require("./User"); // Updated this line
const Post = require("./Post");
const Comment = require("./Comment");

// Associations
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

// Export models and sequelize connection
module.exports = {
  sequelize,
  User,
  Post,
  Comment,
};
