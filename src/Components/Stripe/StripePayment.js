// import { Grid, Paper } from "@mui/material";
// import React from "react";
// import StripeCheckout from "react-stripe-checkout";
// import { ProductPayment } from "./ProductPayment";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import Breadcrumb from "../Breadcumb/Breadcrumb";
// import { useLocation } from "react-router-dom";
// import '../Stripe/Stripe.css'

// const secretKey =
//   "pk_test_51LY3GISC6LWxRL4U85hzY3gXMedtfV23AXPwy5j3ZsvFpPryitcG8RMXLeHx2dye7UmGx7oqjwCyez9DyYiSZC8c00gU8dfbOA";

// export const StripePayment = () => {
//   const navigation = useLocation();
//   const product = useSelector((state) => state.cart.cartItem);

//   const onToken = (token) => {
//     fetch("https://jsonplaceholder.typicode.com/posts", {
//       method: "POST",
//       body: JSON.stringify(token),
//     }).then((response) => {
//       response
//         .json()
//         .then((data) => {
//           alert(`We are in business`);
//         })
//         .catch((e) => console.log(e.message, "error"));
//     });
//   };

//   return (
//     <>
//       <Grid container sx={{ marginTop: "75px" }}>
//         <Grid item xs={12} md={12} sx={{ margin: "10px" }}>
//           <Breadcrumb navigation={navigation} />
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           md={12}
//           className='paymentProduct'
//         >
//           {product.map((item) => (
//             <Grid item xs={12} md={3} sx={{ margin: "10px" }}>
//               <Paper elevation={3}>
//                 <ProductPayment
//                   price={item.price}
//                   title={item.title}
//                   brand={item.brand}
//                   image={item.image}
//                 />
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Grid>
//       <Grid item xs={12} md={12} style={{textAlign:'center',margin:'30px'}}>
//         <StripeCheckout
//           className="checkout"
//           token={onToken}
//           stripeKey={secretKey}
//         />
//       </Grid>
//     </>
//   );
// };
// --------------------//

// import { Box, Button, Grid } from "@material-ui/core";
// import {
//   Elements,
//   CardElement,
//   useElements,
//   ElementsConsumer,
//   useStripe
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import '../Stripe/Stripe.css'
// import { useSelector } from "react-redux";

// // const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
// const stripePromise = loadStripe("pk_test_51LY3GISC6LWxRL4U85hzY3gXMedtfV23AXPwy5j3ZsvFpPryitcG8RMXLeHx2dye7UmGx7oqjwCyez9DyYiSZC8c00gU8dfbOA");
// console.log(stripePromise,'promise')

// const handleSubmit = (stripe, elements) => async (props) => {
//  console.log(props,'total')
//   const billingDetails = {
//     name: 'shubham',
//     // totalAmount:totalAmount, 
//     address: {
//       country:'US',
//       state: 'madhya pradesh',
//       city: 'indore',
//       line1: 'gopur square',
     
//     },
//   };
// const cardElement = elements.getElement(CardElement);

// const {error, paymentMethod} = await stripe.createPaymentMethod({
//   type: 'card',
//   card: cardElement,
//   billing_details: billingDetails,
  
// });

// if (error) {
//   console.log('[error]', error);
// } else {
//   console.log('[PaymentMethod]', paymentMethod);
//   // ... SEND to your API server to process payment intent
// }
// };

// const PaymentForm = () => {
//   const totalAmount = useSelector((state) => state.cart.total)
//   console.log('amount',totalAmount)
//   const stripe = useStripe();
//   const elements = useElements();
//   return (
//     <>
//       <Grid container style={{justifyContent:"center",margin:'75px 0px'}}>

//       <Grid item xs={12} md={4} totalAmount={totalAmount}>
//       <Box className='cardElement'>
//       <CardElement/>
//       </Box>
//       <Box style={{textAlign:'center'}}>
//       <Button variant="outlined" onClick={handleSubmit(stripe, elements)} className='payBtn'>PAY NOW </Button>
//       </Box>
//       </Grid>
//       <Grid item xs={12} md={4}>
//         gdkgl
//       </Grid>
//       </Grid>  
//     </>
//   );
// }

// export const StripePayment   = () => (
//   <Elements stripe={stripePromise}>
//     <PaymentForm/>
//   </Elements>
// );


import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import CardIcon from "../../images/credit-card.svg";
// import ProductImage from "../images/product-image.jpg";
import "../Stripe/Stripe.css";
import { useSelector } from "react-redux";


let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51LY3GISC6LWxRL4U85hzY3gXMedtfV23AXPwy5j3ZsvFpPryitcG8RMXLeHx2dye7UmGx7oqjwCyez9DyYiSZC8c00gU8dfbOA"
    );
  }
  return stripePromise;
};

export const StripePayment = () => {
  const [error, setError] = useState(null);
  const totalAmount = useSelector((state) => state.cart.total)
  console.log(error);
  const item = {
    price: "price_1LaG9USC6LWxRL4UxfT4d144",
    quantity: 1
  };
  const checkoutOption = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`
  };

  const redirectToCheckout = async () => {
    console.log("redirectToCheckot");
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOption);
    setError(error);
  };
  return (
    <div className="checkout">
      <h1>Stripe Checkout</h1>
      <p className="checkout-title">Design+Code React Hooks Course</p>
      <p className="checkout-description">
        Learn how to build a website with React Hooks
      </p>
      <h1 className="checkout-price">{`$ ${totalAmount}`}</h1>
    {/*   <img
        className="checkout-product-image"
        src={ProductImage}
        alt="Product"
      />
      */}
      <button className="checkout-button" onClick={redirectToCheckout}>
        <div className="grey-circle">
          <div className="purple-circle">
           <img className="icon" src={CardIcon} alt="credit-card-icon" /> 
          </div>
        </div>
        <div className="text-container">
          <p className="text">Place Order</p>
        </div>
      </button>
    </div>
  );
};


