import {useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import '../Sign-up/Signup.css'
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth ,db} from '../../Firebase/Firebase';
import {collection,addDoc, setDoc, doc} from "firebase/firestore";
import { Alert } from '@material-ui/lab';
import {PROFILE_PAGE} from '../Routing/RoutePath';
import { toast } from 'react-toastify';
import { getAuth, onAuthStateChanged } from "firebase/auth";


//   https://countriesnow.space/api/v0.1/countries/population/cities





  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const validationSchema = yup.object({
    address: yup
    .string('Enter your address').nullable(true)
    .required('Address is required'),
    locality: yup
        .string('Enter Locality').nullable(true)
        .required('Locality is required'),
    state: yup
        .string('Enter a state').nullable(true)
        .required('State is required'),
    city: yup
        .string('Enter a City').nullable(true)
        .required('City is required'),
    addresstype: yup.string().nullable(true).required('Required'),
    terms: yup.string().nullable(true).required("Select terms & condition"),
});


export const Address = () => {
    const [error,setError] = useState();
    const [value,setValue]= useState();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            address:null,
            locality:null,
            city: null,
            state:null,
            addresstype: null,
            terms: null,
        },
        validationSchema: validationSchema,
        onSubmit: ({address,addresstype,city,state,locality,terms}) => {

            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
               const uid =  user;
               try {
                const data = {
                  id: uid.uid,
                  address: address,
                  addresstype: addresstype,
                  city: city,
                  state: state,
                  locality: locality,
                  terms: terms,
                 
                //   createdAt: serverTimestamp()
                };
                setDoc(doc(db, 'address', uid.uid) , data).then(() => {
                    // toast.success("Address Updated!!", { autoClose: 2000 });
                    navigate(PROFILE_PAGE)
                }).catch(e => {
                    setError(e.message)
                })
              } catch (e) {
                setError(e.message)
              }

            });
            
        }
       
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
            <h3 className='ProductHead'>ADDRESS</h3>
            <form onSubmit={formik.handleSubmit} className="formMain">
                <TextField
                    fullWidth
                    id="address"
                    name="address"
                    label="Address"
                    className='textFiled'
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                />
                <TextField
                    fullWidth
                    id="locality"
                    name="locality"
                    label="Locality/Location"
                    className='textFiled'
                    value={formik.values.locality}
                    onChange={formik.handleChange}
                    error={formik.touched.locality && Boolean(formik.errors.locality)}
                    helperText={formik.touched.locality && formik.errors.locality}
                />
            

                
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                label="City"
                                className='textFiled'
                                name="city"
                                id="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                error={formik.touched.city && (formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                            >
                                <MenuItem value='Indore'>Indore</MenuItem>
                                <MenuItem value='Bhopal'>Bhopal</MenuItem>
                                <MenuItem value='Mumbai'>Mumbai</MenuItem>
                            </Select>
                        </FormControl>
                        {(formik.touched.city && Boolean(formik.errors.city)) ?
                            <div severity="error" className='error'>Please choose a city</div>
                            :
                            ''
                        }
                    </Grid>

                    <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">State</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            label="State"
                            className='textFiled'
                            name="state"
                            id="state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            error={formik.touched.state && (formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                        >
                            <MenuItem value='Madhya Pradesh'>Madhya Pradesh</MenuItem>
                            <MenuItem value='Gujrat'>Gujrat</MenuItem>
                            <MenuItem value='UP'>UP</MenuItem>
                        </Select>
                    </FormControl>
                    {(formik.touched.state && Boolean(formik.errors.state)) ?
                        <div severity="error" className='error'>Please choose a state</div>
                        :
                        ''
                    }
                </Grid>
                </Grid>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label" className='textFiled'>Address Type</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="addresstype"
                        value={formik.values.addresstype}
                        onChange={formik.handleChange}
                        error={formik.touched.addresstype && (formik.errors.addresstype)}
                        helperText={formik.touched.addresstype && formik.errors.addresstype}

                    >
                        <FormControlLabel value="Home" control={<Radio />} label="HOME" />
                        <FormControlLabel value="Office" control={<Radio />} label="OFFICE" />
                        <FormControlLabel value="Other" control={<Radio />} label="OTHER" />
                    </RadioGroup>
                </FormControl>
                {(formik.touched.addresstype && Boolean(formik.errors.addresstype)) ?
                    <div severity="error" className='error'>Please choose a address type</div>
                    :
                    ''
                }
                <div className='checkboxDiv'>
                    <Checkbox
                        name='terms'
                        className='checkbox'
                        value={formik.values.terms}
                        onChange={formik.handleChange}
                        error={formik.touched.terms && (formik.errors.terms)}
                        helperText={formik.touched.terms && formik.errors.terms}
                    /><span> Accept Terms & Condition</span>
                    {(formik.touched.terms && Boolean(formik.errors.terms)) ?
                        <div severity="error" className='error'>Required Terms & Condition</div>
                        :
                        ''
                    }
                </div>
                {error?
                    <Alert variant="outlined" severity="error" className='alert'>
                        {error.split('auth/')} !!
                    </Alert>
                    : ""}
                <div className='subBtn'>
                    <Button variant="contained" className="subBtn1" type="submit">
                        SAVE
                    </Button>
                </div>
            </form>
        </Paper>
    </Box>
</div>
  )
}











