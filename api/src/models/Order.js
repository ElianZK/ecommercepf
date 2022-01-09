const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('order', {
        idOrder:{
            type: DataTypes.UUID,
            primaryKey:true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        // date: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     // unique:true
        // },
        address:{
          type:DataTypes.JSON({
              country:{type:DataTypes.STRING},
              city:{type:DataTypes.STRING},
              street:{type:DataTypes.STRING},
              postalCode:{type:DataTypes.STRING}
          }),
          allowNull:false,
          defaultValue: {
            country:'',
            city:'',
            street:'',
            postalCode:''
          }
      },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("created","processing","canceled","completed","rejected"),
            allowNull: false,
        }
    },{
      createdAt: 'creationDate',
      updatedAt: 'confirmationDate',
    });
};