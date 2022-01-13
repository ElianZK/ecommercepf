require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DATABASE
} = process.env;
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DATABASE}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Category, Order, Product, User, Cart, Details, Brand, CategoryBrand, Reviews, WishList} = sequelize.models;

// Aca vendrian las relaciones

//Cada usuario puede guardar en su carrito muchos productos, y estos productos pueden ser los mismos para distintos usuarios
Product.belongsToMany(User, { through: Cart , foreignKey:"ProductId"}); //users
User.belongsToMany(Product,{ through: Cart , foreignKey:"UserId"});  //products

//Muchos productos pueden estar en una misma orden y distintas ordenes pueden tener a los mismos productos
Product.belongsToMany(Order, { through: Details, foreignKey:"ProductId" }); //orders
Order.belongsToMany(Product,{ through: Details , foreignKey:"OrderId"}); //products

//Un usuario puede tener varias ordenes, pero cada orden pertenece a un único usuario
Order.belongsTo(User, {as:"user", foreignKey:{name: 'UserId'} }); //user
User.hasMany(Order, {as:"orders",foreignKey:{name:'UserId'}  }); //orders


//Cada categoría puede tener distintas marcas y a su vez cada marca puede pertenecer a distintas categorías
Category.belongsToMany(Brand, { through:"categoryBrand", foreignKey:"CategoryId" }); //brands
Brand.belongsToMany(Category, { through: "categoryBrand", foreignKey:"BrandId"}); //categories

//Cada producto tiene un único par categoría-Marca, pero muchos productos pueden tener el mismo
CategoryBrand.hasMany(Product, {as:"relation", foreignKey:{name:"idRelation",type: DataTypes.UUID,}}); //relation
Product.belongsTo(CategoryBrand, {foreignKey:{ name:"idRelation", type: DataTypes.UUID, },as:"relation"}); //categoryBrand

//puntuacion y comentarios del usuario a un producto
Product.belongsToMany(User, {through:"reviews"});
User.belongsToMany(Product, {through:"reviews"});

//Lista de deseos
Product.belongsToMany(User, { through: WishList ,as:"favourites", foreignKey:"ProductId"}); //users
User.belongsToMany(Product,{ through: WishList , as:"favourites", foreignKey:"UserId"});  //products

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
