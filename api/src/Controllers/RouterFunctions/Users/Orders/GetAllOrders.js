const {Order,Product} = require("../../../../db");



const getAllOrders = async(req,res,next)=>{
try {
  let {count, rows} = await Order.findAndCountAll({
    attributes:{
      exclude:["confirmationDate"]
    },
    include: {
      model:Product,
      attributes:["idProduct", "name", "thumbnail"],
    },
  })
  
  let orders = rows.map(el=>{
    let {products, ...otherData} = el.toJSON();
    products = products.map(prod=>{
      let {details,...prodData}= prod;
      return {...prodData, amount:details.amount, price:details.price};
    });
    return {...otherData, products};
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