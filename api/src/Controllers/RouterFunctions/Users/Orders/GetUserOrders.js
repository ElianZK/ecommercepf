const {Details, User, Order, Product} = require("../../../../db");

const getUserOrders = async(req, res,next)=>{
  try {
    console.log(req.params)
    const {UserId, OrderId=null} = req.params;
    let user = await User.findOne({
      where:{
        idUser: UserId
      },
      attributes:{
        exclude:["images", "attributes", "password", "phone", "type", "email","image", "address"]
      }
    });
    if(!OrderId){
      //[Si no tengo un id de orden, entonces presento todas las órdenes de un usuario
      let orders = await Order.findAll({
        where:{
          UserId
        },
        attributes:{
          exclude:["confirmationDate", "UserId"]
        },
        include: Product
      
      })
      
      res.status(200).json({user, orders})
    }else{
      //[En caso de tener un id de Orden, muestro tanto la orden como los productos asociados a esa orden
      let order = await Order.findByPk(OrderId);

      let orderProducts = await Details.findAll({
        where:{
          OrderId
        },
        attributes:{
          exclude:["confirmationDate", "UserId"]
        }
      })
      
      res.status(200).json({user, order, orderProducts})
    }


  } catch (error) {
    console.log("/Users/order/:UserId: ", error);
    next(error)
  }
}

module.exports= {
  getUserOrders
}