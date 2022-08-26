import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "../Cart/Cart.css";
import { useNavigate } from "react-router-dom";
import {collection,getDocs,} from "firebase/firestore";
import { db} from "../../Firebase/Firebase";
import { ADDRESS_PAGE} from "../Routing/RoutePath";
import { loadStripe } from "@stripe/stripe-js";
import "../Stripe/Stripe.css";
import { useSelector } from "react-redux";
import { STRIPE_KEY } from "../../service";


let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_KEY);
  }
  return stripePromise;
};

const steps = [
  {
    label: "DELIVERY ADDRESS",
  },
  {
    label: "MAKE PAYMENT",
  },
];

export const PaymentStepper = ({ setState }) => {
  const [error, setError] = useState(null);
  const totalAmount = useSelector((state) => state.cart.total);

  const item = {
    price: "price_1LaG9USC6LWxRL4UxfT4d144",
    quantity: 1,
  };
  const checkoutOption = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
  };

  const redirectToCheckout = async () => {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOption);
    setError(error);
  };

  const navigate = useNavigate();
  const [address, setAddress] = useState();
  const [toggle, setToggle] = useState(true);
  const UID = localStorage.getItem("uid");
  const getAddress = address && UID && address?.filter((i) => i.id == UID)[0];
  useEffect(() => {
    const getData = async () => {
      const userAddress = await getDocs(collection(db, "address"));
      setAddress(
        userAddress.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    getData();
  }, [toggle]);

  const [activeStep, setActiveStep] = React.useState(0);
  const id = localStorage.getItem("token");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const addressToggle = () => {
    setState("right", false);
    navigate(ADDRESS_PAGE);
  };

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              {step.label == "DELIVERY ADDRESS" && (
                <Paper style={{ padding: "20px", width: "250px" }}>
                  <Box>
                    {getAddress && (
                      <>
                        <Typography variant="body2">
                          {getAddress.address}
                        </Typography>
                        <Typography variant="body2">
                          {getAddress.locality}
                        </Typography>
                        <Typography variant="body2">{`${getAddress.city} , ${getAddress.state}`}</Typography>
                      </>
                    )}
                    <Button
                      className="addressBtn"
                      variant="outlined"
                      onClick={addressToggle}
                      sx={{ mt: 1, mb: 1 }}
                    >
                      ADD ADDRESS
                    </Button>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <div>
                      {getAddress ? (
                        <Button
                          variant="outlined"
                          className="confirm"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 3 }}
                        >
                          {index === steps.length - 1 ? "Finish" : "Continue"}
                        </Button>
                      ) : (
                        <Button
                          disabled
                          variant="outlined"
                          onClick={handleNext}
                          sx={{ mr: 3 }}
                        >
                          {index === steps.length - 1 ? "Finish" : "Continue"}
                        </Button>
                      )}
                      <Button
                        className="cancel"
                        variant="outlined"
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mr: 1, ml: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </Paper>
              )}

              {step.label == "MAKE PAYMENT" && (
                <Box sx={{ mb: 2 }}>
                
                  <form>
                    <div>
                      <Button
                        variant="outlined"
                        className="confirm"
                        onClick={redirectToCheckout}
                        sx={{ mt: 1, mr: 3 }}
                       
                      >
                        {index === steps.length - 1
                          ? `PAY $ ${totalAmount}`  
                          : "Continue"}
                      </Button>

                      <Button
                        className="cancel"
                        variant="outlined"
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{mr: 1, ml: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </form>
                </Box>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};
