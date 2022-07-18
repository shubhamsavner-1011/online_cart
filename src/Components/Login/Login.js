import react,{useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import '../SignUp/Signup.css'
import { useDispatch } from 'react-redux';
import { login } from '../../Store/UserSlice';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';


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


export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [buttonDisabled,setButtonDisabled] = useState(false);
    const [err,setError] = useState()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            terms:'',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {         
            dispatch(login(values))
            setButtonDisabled(true)
            alert(JSON.stringify(values, null, 4));
            console.log(values, 'Login value');
            navigate('/')
            createUserWithEmailAndPassword(auth,values.email,values.password).then(res =>{
                setButtonDisabled(false)
            }).catch(err =>{console.log(err,'error')})
        },
    });
  return (
    <div>
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
                    helperText={formik.touched.email && formik.errors.email}
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
                    helperText={formik.touched.password && formik.errors.password}
                />

                <div className='checkboxDiv'>
                <Checkbox
                name='terms'
                className='checkbox'
                value={formik.values.terms}
                onChange={formik.handleChange}
                error={formik.touched.terms && (formik.errors.terms)}
                helperText={formik.touched.terms && formik.errors.terms}
                /><span> Accept Terms & Condition</span>
                {(formik.touched.terms && Boolean(formik.errors.terms))?
                    <div severity="error" className='error'>Required Terms & Condition</div>
                    :
                    ''
                    }
                </div>
                
                <div className='subBtn'>
                    <Button variant="contained"  className="subBtn1" type="submit" disabled={buttonDisabled}>
                        LOGIN
                    </Button>
                </div>
            </form>
        </Paper>
    </Box>
</div>
  )
}








