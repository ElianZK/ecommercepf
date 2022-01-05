const {Cart, User, Order} = require("../../../../db");

const postUserOrder = async(req, res,next)=>{
  try {
    const {UserId} = req.params;
    const {address, totalPrice} = req.body;
    let user = await User.findByPk(UserId);
    let order = await Order.create({
      address,
      status:"created",
      totalPrice
    })

    await user.addOrder(order);
    await order.setUser(user);
    let cosas = await user.getOrders();

    //TODO: Tengo que agarrar a cada producto (tengo el id en req.body) y relacionarlo con  "order" y agregarle el amount correspondiente (MUY PARECIDO A LO QUE HICE EN CART);
    
    
    res.status(200).json({msg: "orders", user, order, cosas})


  } catch (error) {
    console.log("/Users/order/:UserId: ", error);
    next(error)
  }
}

module.exports= {
  postUserOrder
}