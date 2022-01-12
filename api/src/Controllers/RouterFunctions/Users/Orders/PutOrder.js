const {Order,Product} = require("../../../../db");


const putOrder = async (req,res,next)=>{
  try{
    const {OrderId} = req.params;
    const { dispatched} = req.body;
    
    //[Busco la orden
    let order = await Order.findByPk(OrderId);
    let updated = await order.update({dispatched});
    

    return res.status(200).json({order, updated});
  }catch(err){
    console.log("PUT /order/:OrderId", err);
    next(err)
  }
};

module.exports = {putOrder};


