const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('DetailsOrderProduct', {
        idDCP:{
            type: DataTypes.UUID,
            primaryKey:true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
    },
    { timestamps: false }
    );
};