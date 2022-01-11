const {Order,Product} = require("../../../../db");



const getAllOrders = async(req,res,next)=>{
try {
  let orders = await Order.findAll({
    attributes:{
      exclude:["confirmationDate"]
    },
    include: [Product],

  
  })
  

  res.status(200).json({orders});

} catch (error) {
  console.log('/admin/orders', error)
  next(error);
}
};

module.exports = {
  getAllOrders
}