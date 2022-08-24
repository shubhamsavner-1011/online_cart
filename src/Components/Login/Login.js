import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import '../Sign-up/Signup.css'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase';
import { Alert } from '@material-ui/lab';
import { CART_PAGE, DASHBOARD_PAGE, FORGET_PASSWORD, LOGIN_PAGE } from '../Routing/RoutePath';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UserSlice, { login } from '../../Store/UserSlice';
import '../Login/Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography } from '@material-ui/core';


const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    terms: yup.string().required("Select terms & condition"),
});


export const Login = ({ setUserName }) => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('redirectURL');
    const [error, setError] = useState()
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            terms: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            signInWithEmailAndPassword(auth, values.email, values.password)
                .then(async (userCredential) => {
                    localStorage.setItem('token', userCredential._tokenResponse.idToken)
                    const users = userCredential.user;
                    setUserName(users.displayName)
                    toast.success("Login Successfull!!",{autoClose:2000})   
                    localStorage.setItem('uid', users.uid)
                    { isLogin ? navigate(CART_PAGE) : navigate(DASHBOARD_PAGE) }
                })
                .catch((error) => {
                       
                    const errorCode = error.code;
                    toast.error(errorCode,{autoClose:2000})
                    setError(errorCode)
                });
        },
    });


    return (
        <>
        <ToastContainer />
        
        <div className='login' >
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: 700,
                    },
                }}
                className='formMui'
            >

                <Paper elevation={3} >
                    <h3 className='ProductHead'>Login</h3>
                    <form onSubmit={formik.handleSubmit} className="formMain">
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            className='textFiled'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helpertext={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            className='textFiled'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && (formik.errors.password)}
                            helpertext={formik.touched.password && formik.errors.password}
                        />

                        <div className='checkboxDiv'>
                            <Checkbox
                                name='terms'
                                className='checkbox'
                                value={formik.values.terms}
                                onChange={formik.handleChange}
                                error={formik.touched.terms && (formik.errors.terms)}
                                helpertext={formik.touched.terms && formik.errors.terms}
                            /><span> Accept Terms & Condition</span>
                            {(formik.touched.terms && Boolean(formik.errors.terms)) ?
                                <div severity="error" className='error'>Required Terms & Condition</div>
                                :
                                ''
                            }
                        </div>
                        {error ?
                            <Alert className='alert' variant="outlined" severity="error">
                                {error.split('auth/')} !!
                            </Alert>
                            : ""}
                        <div className='subBtn'>
                            <Button variant="contained" className="subBtn1" type="submit">
                                LOGIN
                            </Button>
                        </div>
                        <Link to={FORGET_PASSWORD}><Typography style={{color:'black'}}>forget password ?</Typography></Link>
                    </form>
                </Paper>
            </Box>
        </div>
        </>
    )
}








