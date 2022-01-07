const {Cart, User} = require("../../../../db");


const getUserCart = async (req,res,next)=>{
  try{
    const {UserId} = req.params;
    //[Busco el usuario
    let user = await User.findByPk(UserId);
    //[Busco los productos del carrito del usuario
    let cart = await user.getProducts({
      attributes: ["idProduct","name", "price", "stock","image"]
    });
    //[Ordeno los datos para presentarlos de la misma manera que en otras rutas donde uso el carrito
    cart = cart.map(el=>{
      let {idProduct, name, price, stock,image, cart:{amount}}= el.toJSON();
      return {idProduct, name, price, stock,image, amount};
    })
    res.status(200).json({user, cart});
  }catch(err){
    console.log("Get users/cart/:Userid", err);
    next(err)
  }
};

module.exports = {getUserCart};