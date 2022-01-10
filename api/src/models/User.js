
const { DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('user', {
        idUser:{
            type: DataTypes.STRING,
            primaryKey:true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        type: {
            type: DataTypes.ENUM("admin","user"),
            required: true,
            allowNull: false,
        },

        name: {
            type: DataTypes.STRING
        },

        lastname: {
            type: DataTypes.STRING
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            required:true,
            unique:true,
            validate:{
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },

        changepassword:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },

        phone:{
            type: DataTypes.STRING,
            allowNull:false
        },
        image:{
            type:DataTypes.TEXT,
            allowNull:false,
            defaultValue: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg"
        },
        address:{
            type:DataTypes.JSON({
                calle:{type:DataTypes.STRING},
                cp:{type:DataTypes.STRING},
                domicilio:{type:DataTypes.STRING}
            }),
            allowNull:true,
            defaultValue: {
                calle: "calle",
                cp: "cp",
                domicilio: "domicilio"
            }
        }
    },{
        timestamps:false
    });
};
//type, name, email, password, phone, image, address