import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import mobile from '../../images/mobile.jpg'
import { Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import MobileStoreButton from 'react-mobile-store-button';
const iOSUrl = 'https://itunes.apple.com/us/app/all-of-the-lights/id959389722?mt=8';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin:'100px 0'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export const Section1 = () => {
    const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container className='section1'>
        <Grid item xs={12} md={6} className='mobile'>
        <Box className='mobile1'>
            <img src={mobile} alt='mobile' className="mobileImg" />
        </Box>
        </Grid>
        <Grid item xs={12} md={6}>
        <Typography variant='h5' className='sectionHead'>Download Snapdeal <br/> App Now</Typography>
        <Typography variant='body2' className='sectionSubHead'>
        Fast, Simple & Delightful.<br/>
        All it takes is 30 seconds to Download.
        </Typography>
      <Box className='StoreBtn'>
        <MobileStoreButton
        store="android"
        url={iOSUrl}
        linkProps={{ title: "iOS Store Button" }}
        className='android'
      />
      <MobileStoreButton
      store="ios"
      url={iOSUrl}
      linkProps={{ title: "iOS Store Button" }}
      className='ios'
    />
    </Box>
        </Grid>

      </Grid>
    </div>
  )
}




