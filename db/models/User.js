const {
  Sequelize,

  DataTypes
} = require('sequelize');

/**
 * 
 * @returns {import('sequelize').Model}
 */



function UserModel() {
  const model = sequelize.define('User', {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
      // allowNull defaults to true
    },

    discord_id : {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true
    },


  }, {
    // Other model options go here
  });


  return model;
}
module.exports = UserModel();