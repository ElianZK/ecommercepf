const {getUserWishList} = require('./GetUserWishList');
const {postUserWishList} = require('./PostUserWishList');
const {deleteWishListProduct} = require('./DeleteWishListProduct');
 
module.exports = {
  getUserWishList,
  postUserWishList,
  deleteWishListProduct
}