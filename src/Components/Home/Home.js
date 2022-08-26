import { Box, Grid } from '@mui/material'
import React from 'react'
import '../Home/Home.css'
import { ProductSlider } from '../Slider/ProductSlider'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {CategoryList } from './CategoryList';
import { SectionFirst } from './SectionFirst';
import Breadcrumb  from '../Breadcumb/Breadcrumb';
import {useLocation} from 'react-router-dom'
import { TrendingCaraousel } from './TrendingCaraousel';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '35%',
    marginTop:'20px '
  },
}));

export const Home = (props) => {
 const  navigation= useLocation()

  const classes = useStyles();
  const { userName } = props
  return (
    <>
    <Grid item xs={12} md={12} className='breadDiv'><Breadcrumb navigation={navigation}/></Grid> 
 
    <Grid container  sx={{marginTop:'10px',justifyContent:'start'}}>
    <Grid item xs={12} md={3} className={classes.root}>
    {localStorage.getItem('token')?
      (
        <Alert iconMapping={{ success: <CheckCircleOutlineIcon fontSize="inherit" /> }}>
          Welcome {`${userName}`} !!
        </Alert>
      ) :
      (
        <Alert variant="outlined" severity="error">
          Please Login !!
        </Alert>
      )
    }
  </Grid>
  </Grid>
 
      <Grid container  sx={{ justifyContent: 'space-around' }}>
        <Grid item xs={12} md={3}>
          <div className='homeHead' style={{fontWeight:'700'}}>TOP CATEGORIES</div>
          <CategoryList/>
        </Grid>
         {/*  */}
        <Grid item xs={10} md={8} className='slider'>
          <ProductSlider />
        </Grid>
      </Grid>
      <Grid container sx={{ justifyContent: 'center' }}>
      <Grid item xs={12} md={10}>
      <div className='homeHead' style={{textAlign:'center',fontSize:'27px',fontWeight:'800',margin:'40px auto'}}>TRENDING PRODUCTS</div>
      <TrendingCaraousel/>
      </Grid>
      </Grid>
       <SectionFirst/> 
    </>

  )
}

