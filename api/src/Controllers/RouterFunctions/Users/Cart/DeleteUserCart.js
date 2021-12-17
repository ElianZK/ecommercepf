const {Cart, User} = require("../../../../db");

const deleteUserCart = async(req,res,next)=>{
try {
  const {UserId} = req.params;
  let user = await User.findByPk(UserId);
  let cart = await Cart.destroy({
    where:{
      UserId
    }
  });

  res.status(200).json({user, deleted:Boolean(cart),productsDeleted:cart})
  
} catch (error) {
  console.log("DELETE /users/cart/:UserId: ", error);
  next(error);
}
}

module.exports={
  deleteUserCart
};