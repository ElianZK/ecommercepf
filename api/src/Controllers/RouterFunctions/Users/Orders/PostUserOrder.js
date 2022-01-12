const {Cart, User, Order, Product, Details} = require("../../../../db");
const Stripe = require("stripe");
//const { default: ShopConfirm } = require("../../EmailsFunctions/ShopConfirm");
require('dotenv').config();
const {STRIPE_CONN} = process.env;
const stripe = new Stripe(STRIPE_CONN);

const {ShopConfirm} = require('../../EmailsFunctions/ShopConfirm')
const {SendEmails} = require('../../EmailsFunctions/SendEmails')

const postUserOrder = async(req, res,next)=>{
  try {
    const {UserId} = req.params;
    //!console.log("PARAMS: ",req.params)
    const {address, totalPrice, email, id, productsInfo} = req.body;
    let idProduct = productsInfo.map(el=>el.idProduct)
    //[Obtengo el usuario
    let user = await User.findByPk(UserId);
    //! console.log("USER: ", user.toJSON());
    //! console.log("a ",address);
    //! console.log("b: ", req.body);
    //[Si no tiene una address definida, le agrego la que uso para este checkout
    if(!user.address){
      await user.update({address})
    }


    //[Creo la orden de compra
    var order = await Order.create({
      address,
      status:"created",
      totalPrice
    })
    //[Relaciono la orden y el usuario
    await user.addOrder(order);
    await order.setUser(user);

    //[Obtengo los productos que se compran
    let products = await Product.findAll({
      where:{
        idProduct
      }
    })
    //! console.log("PRODUCTS: ", products.map(el=>el.toJSON()));

    //[Agrego los productos a la orden
    await order.addProducts(products);
    //! console.log("ORDER: ", order.toJSON())

    //[Busco los productos desde la tabla Details correspondientes a la orden para actualizar la cantidad
    let orderProducts = await Details.findAll({
      where:{
        OrderId:order.idOrder
      }
      
    })
    //! console.log("ORDERPRODUCTS: ",orderProducts.map(el=>el.toJSON()));

    //[Actualizo a la cantidad correspondiente de cada producto en la orden
    let availableProducts = [];
    for(let i=0;i<productsInfo.length;i++){
      //*Busco uno de los productos 
      let product = orderProducts.find(el=>el.ProductId===productsInfo[i].idProduct);

      //*Busco el producto correspondiente de la base de datos (Debo reducirle el stock luego de la compra)
      let databaseProduct = products.find(el=>el.idProduct===product.ProductId);

      if(databaseProduct.stock >= productsInfo[i].amount){
        //*Si el producto tiene stock para permitir la compra, entonces sigo analizando y lo guardo para modificarlo una vez que me asegure que la orden de compra se puede hacer,
        
        availableProducts.push({databaseProduct, product, amount:productsInfo[i].amount,price: productsInfo[i].price})
      }else{
        //*Si no, rompo el bucle y envío un error avisando que no hay suficiente cantidad de dicho producto
        return res.status(400).json({message:`There are only ${databaseProduct.stock} ${databaseProduct.name} left. You must modify your cart's amount. Try again later`})
        
      }
    }

    //[Atualizo los stocks y las cantidades de productos de la orden.
    for(let i =0; i<availableProducts.length;i++){
      let {databaseProduct, product, amount, price } = availableProducts[i];
      await databaseProduct.update({stock:databaseProduct.stock- amount, sold_quantity:databaseProduct.sold_quantity+amount});
      await product.update({amount, price})
    }
    
    //[Gestiono la compra con stripe
    const payment = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice*100), //TODO: 1 peso 100 centavos
      currency: "ars",
      description: `User Email: ${email}`, //TODO: AGREGAR NOMBRE Y APELLIDO, CON FECHA DE COMPRA Y CANTIDAD DE ITEMS
      receipt_email: email,
      payment_method: id,
      payment_method_types: ['card'],
      confirm: true, //confirm the payment at the same time of created the transaction
    });
    //! console.log("PAYMENT: ",payment);
    //! console.log("STATUS: ",payment.status);
    if(payment.status){
      await order.update({status:"completed"})
    }

    let codehtml= ShopConfirm(productsInfo,totalPrice,address);
    SendEmails(email, 'Confirmación de compra', codehtml)
    //console.log(`orderProducts`, orderProducts)
    return res.status(200).json({user, order, orderProducts})

  } catch (error) {
    console.log("/Users/order/:UserId: ", error);
    if(error.statusCode === 402){
      await order.update({status:"rejected"})
      return res.status(error.statusCode).json({msg: `${error.code} ${error.status}`})
    }
    next(error)
  }
}

module.exports= {
  postUserOrder
}


