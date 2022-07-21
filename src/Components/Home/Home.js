import { Grid } from '@mui/material'
import React from 'react'
import '../Home/Home.css'
import { ProductSlider } from '../Slider/ProductSlider'
import { makeStyles } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { category, CategoryList } from './CategoryList';
import { SectionFirst } from './SectionFirst';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '35%',
    marginTop:'20px '
  },
}));

export const Home = (props) => {
  const classes = useStyles();
  const { userName } = props
  console.log(userName, 'nameeeeee>>>>')
  return (
    <>
    <Grid container  sx={{marginTop:'10px'}}>
    <Grid item xs={12} md={3} className={classes.root}>
    {userName ?
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
          <div className='homeHead'>TOP CATEGORIES</div>
          <CategoryList/>
        </Grid>
         {/*  */}
        <Grid item xs={10} md={8} className='slider'>
          <ProductSlider />
        </Grid>
      </Grid>
       <SectionFirst/> 

    </>

  )
}

