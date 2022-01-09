const { DataTypes }=require('sequelize');


module.exports = (sequelize)=>{
    sequelize.define('reviews', {
        idReviews:{
            type:DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        score:{
            type:DataTypes.ENUM("1","2","3","4","5"),
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        timestamps:false
    }
    )
}