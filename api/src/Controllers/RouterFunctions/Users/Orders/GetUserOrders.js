const {Details, User, Order, Product} = require("../../../../db");

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
        },
        include: {
          model:Product,
          attributes:["idProduct", "name", "thumbnail"],
        },
      
      })
      orders = orders.map(el=>{
        let {products, ...otherData} = el.toJSON();
        products = products.map(prod=>{
          let {details,...prodData}= prod;
          return {...prodData, amount:details.amount, price:details.price};
        });
        return {...otherData, products};
      })

      res.status(200).json({user, orders})
    }else{
      //[En caso de tener un id de Orden, muestro tanto la orden como los productos asociados a esa orden
      let order = await Order.findByPk(OrderId,{attributes:{exclude:["confirmationDate"]}});
      
      let orderProducts = await Details.findAll({
        where:{
          OrderId
        },
      })
      let products = await Product.findAll({
        where:{
          idProduct: orderProducts.map(el=>el.toJSON().ProductId)
        },
        attributes: ["name", "idProduct", "thumbnail"]
      })
      orderProducts = orderProducts.map(el=>{
        let {ProductId, OrderId, ...useFullData} = el.toJSON();
        let product = products.find(element=> element.idProduct===el.ProductId).toJSON();
        return {...useFullData, name: product.name, thumbnail:product.thumbnail, idProduct:product.idProduct};
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