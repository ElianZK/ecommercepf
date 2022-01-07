const Stripe = require("stripe");
require('dotenv').config();
const {STRIPE_CONN} = process.env;
const stripe = new Stripe(STRIPE_CONN);

const checkout = async(req, res, next)=>{
  try {

    const { id, amount } = req.body;

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Gaming Keyboard",
      payment_method: id,
      confirm: true, //confirm the payment at the same time of created the transaction
    });
    /*
    [ Lo que llega del front 
    product: buys,
    email: state.email,
    address: `${state.country}/ ${state.city}, ${state.address}, CP: ${state.postalCode}`,
    amount: Math.round(totalPrice)*0.1,
    pay: id 

    [Lo que tiene:
      address: "eeeee/ rrrrrr, ttttttt, CP: 12345",
      amount: 3279.6000000000004,
      email: "asd@gmail.com",
      pay: "pm_1KEyjRFfD78XPAGcuEKOLMYV",
      product:[
       0: {
          image: (4) ['http://http2.mlstatic.com/D_799242-MLA44698671854_012021-O.jpg', 'http://http2.mlstatic.com/D_989777-MLA44698863455_012021-O.jpg', 'http://http2.mlstatic.com/D_636587-MLA44698671855_012021-O.jpg', 'http://http2.mlstatic.com/D_896124-MLA44698863454_012021-O.jpg']
          name: "Zte Blade A5 Plus 32 Gb Negro 2 Gb Ram"
          price: "$14,659.00"
          qty: 1
        },
        1: {
          image: (2) ['http://http2.mlstatic.com/D_838768-MLA48282695987_112021-O.jpg', 'http://http2.mlstatic.com/D_963751-MLA48283099414_112021-O.jpg']
          name: "Zte Blade A51 32 Gb Gris 2 Gb Ram"
          price: "$18,137.00"
          qty: 1
        }
      ]
    
    */

    console.log(payment);

    return res.status(200).json({ message: "Successful Payment" });
    
  } catch (error) {
    console.log(error);
    return res.json({ message: error.raw.message });
  }
};

module.exports = {
  checkout
}