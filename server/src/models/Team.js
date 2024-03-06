const { DataTypes } = require("sequelize");

module.exports = (Sequelize) => {
  Sequelize.define("Team", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
