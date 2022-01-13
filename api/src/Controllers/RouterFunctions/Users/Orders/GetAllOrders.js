const {Order,Product,User} = require("../../../../db");



const getAllOrders = async(req,res,next)=>{
try {
   let {count, rows} = await Order.findAndCountAll({
    attributes:{
      exclude:["confirmationDate"]
    },
     include: [{
      model:Product,
      attributes:["idProduct", "name", "thumbnail"],
    },
    {
      model:User,
      as:"user",
      attributes:["name", "lastname","email"]
    }]
  }) 
  let orders = rows.map(el=>{
    let {products, user, ...otherData} = el.toJSON();
    products = products.map(prod=>{
      let {details,...prodData}= prod;
      return {...prodData, amount:details.amount, price:details.price};
    });
    return {...otherData,name:user.name, lastname:user.lastname, email:user.email, products};
  })
  
  res.status(200).json({count, orders});

} catch (error) {
  console.log('/admin/orders', error)
  next(error);
}
};

module.exports = {
  getAllOrders
}