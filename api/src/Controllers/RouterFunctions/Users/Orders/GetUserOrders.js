const {Cart, User, Order} = require("../../../../db");

const getUserOrders = async(req, res,next)=>{
  try {
    const {UserId} = req.params;
    let user = await User.findOne({
      where:{
        idUser: UserId
      },
      attributes:{
        exclude:["images", "attributes"]
      }
    });
    let orders = await Order.findAll({
      where:{
        idUser :UserId

      }
    })
    let cosas = await user.getOrders();
    res.status(200).json({msg: "orders", user, orders, cosas})


  } catch (error) {
    console.log("/Users/order/:UserId: ", error);
    next(error)
  }
}

module.exports= {
  getUserOrders
}