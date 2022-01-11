const {getUserOrders} = require('./GetUserOrders');
const {postUserOrder} = require('./PostUserOrder')
const {getAllOrders} = require('./GetAllOrders');

module.exports={
  getUserOrders,
  postUserOrder,
  getAllOrders
}