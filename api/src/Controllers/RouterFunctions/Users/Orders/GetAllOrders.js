const {Order,Product,User} = require("../../../../db");



const getAllOrders = async(req,res,next)=>{
try {
  /* let orders = await Order.findAll({
    attributes:{
      exclude:["confirmationDate"]
    },
    include: [Product]

   
  }) */
  /* let data=[]
  for (let i = 0; i < orders.length; i++) {
      // orders[i] = orders
      let idUser = orders[i].UserId
      let user = await User.findAll({
        where: {
          idUser
        },
        attributes:["name","lastname","idUser"]
      })
      console.log(user)
      // data.push({...orders[i], ...user})
      data.push(await user)
  }
  // console.log("data user", data)
  res.status(200).json({orders,data});*/
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