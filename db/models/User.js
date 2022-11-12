const {
  Sequelize,

  DataTypes
} = require('sequelize');

/**
 * 
 * @returns {import('sequelize').Model}
 */
function UserModel() {
  return sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },


  }, {
    // Other model options go here
  });
}
module.exports = UserModel();