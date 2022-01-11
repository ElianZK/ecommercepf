const {Order} = require("../../../../db");



const getAllOrders = async(req,res,next)=>{
try {
  let {count, rows} = await Order.findAndCountAll();

  res.status(200).json({orders:rows, count});

} catch (error) {
  console.log('/admin/orders', error)
  next(error);
}
};

module.exports = {
  getAllOrders
}