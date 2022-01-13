const {getUserOrders} = require('./GetUserOrders');
const {postUserOrder} = require('./PostUserOrder')
const {getAllOrders} = require('./GetAllOrders');
const {putOrder} = require('./PutOrder');

module.exports={
  getUserOrders,
  postUserOrder,
  getAllOrders,
  putOrder
}