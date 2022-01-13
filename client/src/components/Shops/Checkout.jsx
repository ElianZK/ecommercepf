import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import { setOrderProducts, clearCart } from "../../actions";
import s from "../../assets/styles/Checkout.module.css";
import { formatMoney } from "accounting";

const stripePromise = loadStripe(
  "pk_test_51KE0nYFfD78XPAGcGPPH7JVRgUrvShCe00gJQTJ8do8OhF6s205GYs2OrB7qBEdQVhQj3Xh0YtjqE6pAuBQSyomS00FxVwsPvF"
);

export function validate(state) {
  let errors = {};

  if (!state.name) {
    errors.name = "name is required";
  } else if (!/^\w{3,20}$/.test(state.name)) {
    errors.name = "Invalid name";
  } else if (!state.email) {
    errors.email = "email is required";
  } else if (!state.country) {
    errors.country = "country is required";
  } else if (!state.city) {
    errors.city = "city is required";
  } else if (!state.street) {
    errors.street = "street is required";
  } else if (!state.postalCode) {
    errors.postalCode = "postalCode is required";
  
  } else if (!state.phone) {
    errors.phone = "phone is required";
  }
  return errors;
}

export default function Checkout() {
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    console.log(params.product)
  }, [])

  const User = JSON.parse(localStorage.getItem("user"));
  const idUser = !User ? null : User.idUser;
  
  const cart = useSelector((state) => state.ordenReducer.cart);
  const [totalPrice, setTotalPrice] = useState(0);

  const product = useSelector((state) => state.ordenReducer.product);
  const [totalPriceProduct, setTotalPriceProduct] = useState(0);
  
  const [buys, setBuys] = useState([]);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    name: User.name,
    phone: User.phone,
    email: User.email,
    address: {
      country: "",
      city: "",
      street: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    if(cart?.length > 0){
      for (const i in cart) {
        buys.push({
          idProduct: cart[i].idProduct,
          name: cart[i].name,
          image: cart[i].image,
          price: Number(cart[i].price),
          amount: Number(cart[i].amount),
        });

        setTotalPrice(prev => prev + cart[i].price * cart[i].amount);
        // totalPrice += cart[i].price * cart[i].amount;
        //iva = (totalPrice*0.21)
        // console.log("comp",buys)
        // console.log("iva",iva)
      }

      console.log(buys);
    }
  }, [cart]);

  useEffect(() => {
    if(product){
      setTotalPriceProduct(prev => prev + product.price);
    }
  }, [product]);

  useEffect(() => {
    console.log(totalPrice);
  }, [totalPrice]);

  useEffect(() => {
    console.log(totalPriceProduct);
  }, [totalPriceProduct]);
  
  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...state,
        [e.target.name]: e.target.value,
      })
    );
  }

  const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      if (!error) {
        console.log(buys);
        const { id } = paymentMethod;
        let pay = {
          productsInfo: product ? [product] : buys,
          email: state.email,
          address: {
            country: state.country,
            postalCode: state.postalCode,
            city: state.city,
            street: state.street,
          },
          totalPrice: Math.round(params.product === "x" ? totalPrice : totalPriceProduct),
          id: id,
        };
        dispatch(setOrderProducts(pay, User.idUser,product !== null ? true : false)); //aca deberia ir la ruta post
        Swal.fire({
          icon: "success",
          text: "Thank you for your purchase , you will receive an email with the details",
          showConfirmButton: true,
        }).then((result) => {
          if (result.value) {
            //navigate('/buyHistory') //q vaya a ordenes
            if(product === null)dispatch(clearCart(User.idUser));
            window.location = "/buyHistory";
          }
        })
        .catch((error) => console.log(error))
        ///if(product === null)
      } else {
        console.log(error);
      }
    };

    return (
      <form className={s.form_compra} onSubmit={handleSubmit}>
        <CardElement className={s.card} />
        {
        state.email &&
        state.name &&
        state.phone && 
        state.country &&
        state.city &&
        state.postalCode &&
          <button className={s.btn}>CONFIRM YOUR SHOP</button>}
        
      </form>
    );
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Order Summary</h1>
      <div className={s.container_pasarela}>
      {!product ? (<>
          <div className={s.pasarela_card}>
            {cart?.map((e) => {
              /*aca va token*/
              return (
                <div key={e.idProduct} className={s.pasarela_cdtm}>
                  <div>
                    <img
                      className={s.image_pasarela}
                      alt="imagen_pasarela"
                      src={e.image}
                    ></img>
                  </div>

                  <div className={s.pasarela_info}>
                    <div>
                      <p className={s.titulo_pasarela}>{e.name}</p>
                    </div>

                    <div>
                      <p className={s.unidades_pasarela}>Unidades: {e.amount}</p>
                    </div>

                    <div>
                      <p className={s.precio_pasarela}>
                        <span className={s.peso_pasarela}></span>{" "}
                        {formatMoney(e.price)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={s.datos_pasarela}>
            <p className={s.neto_pasarela}>
              Sub-Total:{" "}
              <span className={s.subtotal_pasarela}>
                {" "}
                {formatMoney(totalPrice.toFixed(2))}{" "}
              </span>{" "}
            </p>
            
            <p className="total_pasarela">
              {" "}
              Total Amount:
              <span className="total_numero_pasarela">
                {formatMoney(Math.round(totalPrice))}
              </span>
            </p>
          </div>
        </>) : (<>
          <div className={s.pasarela_card}>
            {product != null ? (<>
              <div key={product.idProduct} className={s.pasarela_cdtm}>
                <div>
                  <img
                    className={s.image_pasarela}
                    alt="imagen_pasarela"
                    src={product.image}
                  ></img>
                </div>

                <div className={s.pasarela_info}>
                  <div>
                    <p className={s.titulo_pasarela}>{product.name}</p>
                  </div>

                  <div>
                    <p className={s.unidades_pasarela}>Unidades: {product.amount}</p>
                  </div>

                  <div>
                    <p className={s.precio_pasarela}>
                      <span className={s.peso_pasarela}></span>{" "}
                      {formatMoney(product.price)}
                    </p>
                  </div>
                </div>
              </div>
            </>) : null}
          </div>

          <div className={s.datos_pasarela}>
            <p className={s.neto_pasarela}>
              Sub-Total:{" "}
              <span className={s.subtotal_pasarela}>
                {" "}
                {formatMoney(totalPriceProduct.toFixed(2))}{" "}
              </span>{" "}
            </p>
            
            <p className="total_pasarela">
              {" "}
              Total Amount:
              <span className="total_numero_pasarela">
                {formatMoney(Math.round(totalPriceProduct))}
              </span>
            </p>
          </div>
        </>)}
        
      </div>

      {buys ? (
        <div className={s.contenedor_facturacion}>
          <p className={s.facturacion_pasarela}>SHIPPING ADDRESS</p>
          <p className={s.direccion_pasarela}></p>
          <div className={s.datos_personales_pasarela}>
            <div>
              <label>Name</label>
              <input id='name'
                type="text"
                required="required"
                autoComplete="name"
                name="name"
                value={state.name}
                onChange={handleChange}
                className={errors.name && "danger"}
              />
              {errors.name && <p className={s.danger}>{errors.name}</p>}
            </div>
            <div>
              <label>Phone</label>
              <input id='phone'
                type="text"
                required="required"
                autoComplete="phone"
                name="phone"
                value={state.phone}
                onChange={handleChange}
                className={errors.phone && "danger"}
              />
              {errors.phone && <p className={s.danger}>{errors.phone}</p>}
            </div>
            <div>
              <label>Email</label>
              <input id='email'
                type="text"
                required="required"
                autoComplete="email"
                name="email"
                value={state.email}
                onChange={handleChange}
                className={errors.email && "danger"}
              />
              {errors.email && <p className={s.danger}>{errors.email}</p>}
            </div>

            <div>
              <label>Country</label>
              <input id='country'
                type="text"
                required="required"
                name="country"
                value={state.country}
                onChange={handleChange}
                className={errors.country && "danger"}
              />
              {errors.country && <p className={s.danger}>{errors.country}</p>}
            </div>
            <div>
              <label>City</label>
              <input id='city'
                type="text"
                required='required'
                name="city"
                value={state.city}
                onChange={handleChange}
                className={errors.city && "danger"}
              />
              {errors.city && <p className={s.danger}>{errors.city}</p>}
            </div>
            <div>
              <label>Street</label>
              <input id='direction'
                type="text"
                required='required'
                name="direction"
                value={state.direction}
                onChange={handleChange}
                className={errors.direction && "danger"}
              />
              {errors.direction && <p className={s.danger}>{errors.direction}</p>}
            </div>
            <div>
              <label>Postal Code</label>
              <input id='postalCode'
                type="number"
                min={1}
                required='required'
                name="postalCode"
                value={state.postalCode}
                onChange={handleChange}
                className={errors.postalCode && "danger"}
              />
              {errors.postalCode && <p className={s.danger}>{errors.postalCode}</p>}
            </div>
          </div>
          <div>
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </div>
        </div>
      ) : (
        <div>
          <p>To continue with the purchase you must LOG IN </p>
        </div>
      )}
    </div>
  );
}
