const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('genero', {
          id: {
            type: DataTypes.INTEGER,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          name: {
            type: DataTypes.STRING,
          },
          createdInDb: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
          }
    })
}