const {Order,Product} = require("../../../../db");

const {StatusShop} = require('../../EmailsFunctions/StatusShop')
const {SendEmails} = require('../../EmailsFunctions/SendEmails')



const putOrder = async (req,res,next)=>{
  try{
    const {OrderId} = req.params;
    const { dispatched,email} = req.body;
    
    //[Busco la orden
    let order = await Order.findByPk(OrderId);
    await order.update({dispatched});

    let codehtml= StatusShop({dispatched}, OrderId);
    SendEmails(email, 'Estado de la compra', codehtml)
    

    return res.status(200).json({order});
  }catch(err){
    console.log("PUT /order/:OrderId", err);
    next(err)
  }
};

module.exports = {putOrder};


