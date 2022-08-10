import React from "react";
import { useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "../SignUp/Signup.css";
import {Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "../Login/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Alert } from "@mui/material";
import { LOGIN_PAGE } from "../Routing/RoutePath";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

export const ForgetPassword = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values.email,'email')
        const auth = getAuth();
        console.log(auth,'auth')
        sendPasswordResetEmail(auth, values.email)
          .then(() => {
            toast.success("Email Sent Successfully!!",{autoClose:2000}) 
            console.log("email sent");
            // ..
          })
          .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage)
          });
    },
  });

  return (
    <>
      <ToastContainer />

      <div className="login">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 700,
            },
          }}
          className="formMui"
        >
          <Paper elevation={3}>
          <Link to={LOGIN_PAGE}><ArrowBackIcon className="backBtn"/> </Link>
            <h3 className="ProductHead">FORGET PASSWORD</h3>
            <form onSubmit={formik.handleSubmit} className="formMain">
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                className="textFiled"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helpertext={formik.touched.email && formik.errors.email}
              />

              {error ? (
                <Alert className="alert" variant="outlined" severity="error">
                  {error.split("auth/")} !!
                </Alert>
              ) : (
                ""
              )}
              <div className="subBtn">
                <Button variant="contained" className="subBtn1" type="submit">
                  FORGET PASSWORD
                </Button>
              </div>
         
            </form>
          </Paper>
        </Box>
      </div>
    </>
  );
};
