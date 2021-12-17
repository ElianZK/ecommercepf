const {Cart, User} = require("../../../../db");

const deleteUserCart = async(req,res,next)=>{
try {
  const {UserId} = req.params;
  let user = await User.findByPk(UserId);
  let cart = await Cart.findAll({
    where:{
      UserId
    }
  });
  for(product of cart){
    await product.destroy();
  }
  res.status(200).json({user, cart})
  
} catch (error) {
  console.log("DELETE /users/cart/:UserId: ", error);
  next(error);
}
}

module.exports={
  deleteUserCart
};