const {Cart, User} = require("../../../db");


const getUserCart = async (req,res,next)=>{
  try{
    const {UserId} = req.params;
    //[Busco el usuario
    let usuario = await User.findByPk(UserId);
    //[Busco los productos del carrito del usuario
    let carrito = await usuario.getProducts({
      attributes: ["idProduct","name", "price", "stock"]
    });
    //[Ordeno los datos para presentarlos de la misma manera que en otras rutas donde uso el carrito
    carrito = carrito.map(el=>{
      let {idProduct, name, price, stock, cart:{amount}}= el.toJSON();
      return {idProduct, name, price, stock, amount};
    })
    res.status(200).json({usuario, carrito});
  }catch(err){
    console.log("Get users/cart/:Userid", err);
    next(err)
  }
};

module.exports = {getUserCart};