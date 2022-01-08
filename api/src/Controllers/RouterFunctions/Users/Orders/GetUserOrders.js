const {Product, Details, User, Order} = require("../../../../db");

const getUserOrders = async(req, res,next)=>{
  try {
    //! console.log(req.params);
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
        }
      });

      res.status(200).json({user, orders})
    }else{
      //[En caso de tener un id de Orden, muestro tanto la orden como los productos asociados a esa orden
      let order = await Order.findByPk(OrderId);
      
      let orderProducts = await Details.findAll({
        where:{
          OrderId
        },
      })
      let products = await Product.findAll({
        where:{
          idProduct: orderProducts.map(el=>el.toJSON().ProductId)
        },
        attributes: ["price", "name", "idProduct", "thumbnail"]
      })
      orderProducts = orderProducts.map(el=>{
        el = el.toJSON();
        let product = products.find(element=> element.idProduct===el.ProductId).toJSON();
        return {...el, price:product.price, name: product.name, thumbnail:product.thumbnail};
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