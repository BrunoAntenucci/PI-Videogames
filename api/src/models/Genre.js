const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('genre', {
          name: {
            type: DataTypes.STRING,
          },
          createdInDb: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
          }
    })
}