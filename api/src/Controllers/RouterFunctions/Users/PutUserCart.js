const {Op} = require('sequelize');
const {Cart, User, Product} = require("../../../db");


const putUserCart = async (req,res,next)=>{
  try{
    const {UserId} = req.params;
    const { productsInfo} = req.body;
    //[ Me dejo un arreglo con los ids de los productos que componen el nuevo carrito
    let idProduct = productsInfo.map(el=>el.idProduct)

    //[Busco al usuario
    let usuario = await User.findByPk(UserId);
    //! console.log(usuario.toJSON());
    
    //[Remuevo los elementos del carrito previamente asociados al usuario.
    await usuario.removeProducts(await usuario.getProducts());
    //! console.log("Ahora en el carrito hay : ", await usuario.countProducts(), "productos");

    //[Busco los productos que agregaré al carrito.
    let products = await Product.findAll({
      where:{
        idProduct
      }
    })
    //! console.log( products.map(el=>el.toJSON()));

    //[ Agrego los productos al carrito
    await usuario.addProducts(products);

    //[Busco los productos desde la tabla carrito para actualizar la cantidad
    let cart = await Cart.findAll({
      where:{
        UserId
      }
    })
    //!console.log("Carrito: ", cart.map(el=>el.toJSON()));

    //[Actualizo a la cantidad correspondiente de cada producto del carrito
    for(let i=0;i<productsInfo.length;i++){
      let algo = cart.find(el=>el.ProductId===productsInfo[i].idProduct);
      await algo.update({amount:productsInfo[i].amount})
    }

    //[Los vuelvo a pedir para enviar los datos correctamente
    products = await usuario.getProducts({
      attributes: ["idProduct","name", "price", "stock"]
    });
    products = products.map(el=>{
      const{idProduct, name, price, stock, cart:{amount}} = el.toJSON()
      return {idProduct, name, price, stock, amount}
    })

    return res.status(200).json({usuario, carrito: products});
  }catch(err){
    console.log("Get users/cart/:id", err);
    next(err)
  }
};

module.exports = {putUserCart};

/*
Foo.belongsToMany(Bar, { through: Baz })
The same ones from Foo.hasMany(Bar):

fooInstance.getBars()
fooInstance.countBars()
fooInstance.hasBar()
fooInstance.hasBars()
fooInstance.setBars()
fooInstance.addBar()
fooInstance.addBars()
fooInstance.removeBar()
fooInstance.removeBars()
fooInstance.createBar()
*/

