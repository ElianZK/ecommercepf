const {WishList, User} = require("../../../../db");


const getUserWishList = async (req,res,next)=>{
  try{
    const {UserId} = req.params;
    //[Busco el usuario
    let user = await User.findByPk(UserId);

    //[Busco los productos de la lista de deseos del usuario
    let wishList = await user.getFavourites({
      attributes: ["idProduct","name", "price", "stock","thumbnail"]
    });

    //[Ordeno los datos para presentarlos de la misma manera que en otras rutas donde uso el carrito
    wishList = wishList.map(el=>{
      let {idProduct, name, price, stock,thumbnail}= el.toJSON();
      return {idProduct, name, price, stock,thumbnail};
    })
    res.status(200).json({wishList});
  }catch(err){
    console.log("Get users/wishlist/:Userid", err);
    next(err)
  }
};

module.exports = {getUserWishList};