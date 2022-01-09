const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('details', {
      // idDCP:{
      //     type: DataTypes.UUID,
      //     primaryKey:true,
      //     allowNull: false,
      //     defaultValue: DataTypes.UUIDV4
      // },
      amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    }
      
  },
  { timestamps: false }
)};