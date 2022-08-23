import { Grid } from '@mui/material';
import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { ProductPayment } from './ProductPayment';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Breadcrumb from '../Breadcumb/Breadcrumb';
import { useLocation} from 'react-router-dom'

const secretKey = 'pk_test_51LY3GISC6LWxRL4U85hzY3gXMedtfV23AXPwy5j3ZsvFpPryitcG8RMXLeHx2dye7UmGx7oqjwCyez9DyYiSZC8c00gU8dfbOA'

export const StripePayment = () => {
  const navigation = useLocation();
  const product = useSelector((state) => state.cart.cartItem);



   const onToken = (token) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business`);

      }).catch((e)=>console.log(e.message,'error'))
    });
  }


  return (
    <>
   <Grid container sx={{marginTop:'75px',justifyContent:'center'}}>
   <Grid item xs={12} md={12} sx={{ margin: '10px' }}><Breadcrumb navigation={navigation} /></Grid>
   <Grid item xs={12} md={8}>
   {product.map((item)=>(
    <ProductPayment 
    price={item.price}
    title={item.title}
    brand={item.brand}
    image={item.image}
    />
 
    ))}
    <StripeCheckout
    className='checkout'
   token={onToken}
   stripeKey={secretKey}
   />
   </Grid>
    </Grid>
    </>
  )

}



// import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

// export const Stripe = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     // We don't want to let default form submission happen here,
//     // which would refresh the page.
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     const result = await stripe.confirmPayment({
//       //`Elements` instance that was used to create the Payment Element
//       elements,
//       confirmParams: {
//         return_url: "https://example.com/order/123/complete",
//       },
//     });


//     if (result.error) {
//       // Show error to your customer (for example, payment details incomplete)
//       console.log(result.error.message);
//     } else {
//       // Your customer will be redirected to your `return_url`. For some payment
//       // methods like iDEAL, your customer will be redirected to an intermediate
//       // site first to authorize the payment, then redirected to the `return_url`.
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <button disabled={!stripe}>Submit</button>
//     </form>
//   )
// };
