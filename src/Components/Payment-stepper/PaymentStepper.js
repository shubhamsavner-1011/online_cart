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
import { Address } from "../Profile/Address";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { db, storage, auth } from "../../Firebase/Firebase";
import { ADDRESS_PAGE,STRIPE_PAYMENT } from "../Routing/RoutePath";

const steps = [
  {
    label: "DELIVERY ADDRESS",
  },
  {
    label: "MAKE PAYMENT",
  },
];

export const PaymentStepper = ({ setState }) => {
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

  const placeOrder = () => {
    navigate(STRIPE_PAYMENT)
    setState("right", false);
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
                        sx={{ mt: 1, mr: 1, ml: 1 }}
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
                        onClick={placeOrder}
                        sx={{ mt: 1, mr: 3 }}
                       
                      >
                        {index === steps.length - 1
                          ? "Place Order"
                          : "Continue"}
                      </Button>

                      <Button
                        className="cancel"
                        variant="outlined"
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1, ml: 1 }}
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
