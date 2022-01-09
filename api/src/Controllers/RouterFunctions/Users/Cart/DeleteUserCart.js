const {Cart, User} = require("../../../../db");
const deleteUserCart = async(req,res,next)=>{
try {
  const {UserId} = req.params;
  const {idProduct=null} = req.query;
  let user = await User.findByPk(UserId);

  let cart = null;
  
  if(idProduct){
    console.log("pruebaidproduct",idProduct)
    cart= user.removeProducts(idProduct);
  }else{
    cart = await Cart.destroy({
      where:{
        UserId
      }
    });
  }

  let products = await user.getProducts({
    attributes: ["idProduct","name", "price", "stock","image"]
  });
  products = products.map(el=>{
    const{idProduct, name, price, stock,image, cart:{amount}} = el.toJSON()
    return {idProduct, name, price, stock,image, amount, totalPrice:amount*price}
  })

  return res.status(200).json({/* user,*/ cart:  products});
  //res.status(200).json({user, deleted:Boolean(cart),productsDeleted:cart})
  
} catch (error) {
  console.log("DELETE /users/cart/:UserId: ", error);
  next(error);
}
}

module.exports={
  deleteUserCart
};