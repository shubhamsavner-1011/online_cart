import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "./Signup.css";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../Firebase/Firebase";
import { Alert } from "@material-ui/lab";
import { DASHBOARD_PAGE } from "../Routing/RoutePath";
import { collection, addDoc, doc,setDoc, serverTimestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = yup.object({
  name: yup
    .string("Enter your name")
    .nullable(true)
    .required("Email is required"),
  email: yup
    .string("Enter your email")
    .nullable(true)
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .nullable(true)
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  phone: yup
    .string()
    .nullable(true)
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "minimum 10 character")
    .max(10, "please enter valid number")
    .required("Number required"),
  gender: yup.string().nullable(true).required("Required"),
  age: yup.string().nullable(true).required("Select your age category"),
  terms: yup.string().nullable(true).required("Select terms & condition"),
});

export const SignUp = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const photoURL = useSelector((state) => state.product);
  let url = photoURL.photo;


  const formik = useFormik({
    initialValues: {
      name: null,
      email: null,
      password: null,
      age: null,
      gender: null,
      phone: null,
      terms: null,
    },
    validationSchema: validationSchema,
    onSubmit: ({ email, password, name, age, phone, gender, terms }) => {
      createUserWithEmailAndPassword(auth, email, password, name)
        .then(async (res) => {
          const user = res.user;
          try {
            const data = {
              id: user?.uid,
              name: name,
              email: email,
              age: age,
              gender: gender,
              phoneNumber: phone,
              terms: terms,
              createdAt: serverTimestamp()
            };
            setDoc(doc(db, 'users', user.uid), data).then(() => {
                toast.success("Signup Successfull!!", { autoClose: 2000 });
            }).catch(e => {
              setError(e.message)                
            })
          } catch (e) {
            setError(e.message) 
          }

          await updateProfile(user, {
            displayName: name,
          });

          navigate(DASHBOARD_PAGE);
        })
        .catch((error) => {
          const errorCode = error.code;
          setError(errorCode);
        });
    },
  });
  return (
    <>
      <ToastContainer />

      <div>
        <Box
          sx={{
            display: "flex",
            marginTop:'75px',
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 700,
            },
          }}
          className="formMui"
        >
          <Paper elevation={3}>
            <h3 className="ProductHead">Sign-Up</h3>
            <form onSubmit={formik.handleSubmit} className="formMain">
              <TextField
                fullWidth
                id="name"
                name="name"
                label="name"
                className="textFiled"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                className="textFiled"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                className="textFiled"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      label="Age"
                      className="textFiled"
                      name="age"
                      id="age"
                      value={formik.values.age}
                      onChange={formik.handleChange}
                      error={formik.touched.age && formik.errors.age}
                      helperText={formik.touched.age && formik.errors.age}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                    </Select>
                  </FormControl>
                  {formik.touched.age && Boolean(formik.errors.age) ? (
                    <div severity="error" className="error">
                      Please choose a age
                    </div>
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    label="Phone"
                    type="number"
                    className="textFiled"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && formik.errors.phone}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Grid>
              </Grid>
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  className="textFiled"
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  error={formik.touched.gender && formik.errors.gender}
                  helperText={formik.touched.gender && formik.errors.gender}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
              {formik.touched.gender && Boolean(formik.errors.gender) ? (
                <div severity="error" className="error">
                  Please choose a gender
                </div>
              ) : (
                ""
              )}
              <div className="checkboxDiv">
                <Checkbox
                  name="terms"
                  className="checkbox"
                  value={formik.values.terms}
                  onChange={formik.handleChange}
                  error={formik.touched.terms && formik.errors.terms}
                  helperText={formik.touched.terms && formik.errors.terms}
                />
                <span> Accept Terms & Condition</span>
                {formik.touched.terms && Boolean(formik.errors.terms) ? (
                  <div severity="error" className="error">
                    Required Terms & Condition
                  </div>
                ) : (
                  ""
                )}
              </div>
              {error ? (
                <Alert variant="outlined" severity="error" className="alert">
                  {error.split("auth/")} !!
                </Alert>
              ) : (
                ""
              )}
              <div className="subBtn">
                <Button variant="contained" className="subBtn1" type="submit">
                  SIGN UP
                </Button>
              </div>
            </form>
          </Paper>
        </Box>
      </div>
    </>
  );
};
