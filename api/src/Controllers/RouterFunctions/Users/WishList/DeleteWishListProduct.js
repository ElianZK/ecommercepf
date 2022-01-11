const {Cart, User} = require("../../../../db");

const deleteWishListProduct = async(req,res,next)=>{
try {
  const {UserId, ProductId} = req.params;
  let user = await User.findByPk(UserId);

  let deleted = await user.removeFavourite(ProductId);
  

  let products = await user.getFavourites({
    attributes: ["idProduct","name", "price", "stock","thumbnail"]
  });
  products = products.map(el=>{
    const {idProduct, name, price, stock,thumbnail} = el.toJSON()
    return {idProduct, name, price, stock,thumbnail};
  })

  return res.status(200).json({deleted: Boolean(deleted), wishList: products });
  
} catch (error) {
  console.log("DELETE /users/wishlist/:UserId/:ProductId ", error);
  next(error);
}
}

module.exports={
  deleteWishListProduct
};