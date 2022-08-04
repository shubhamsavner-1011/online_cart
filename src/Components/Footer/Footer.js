import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import '../Footer/Footer.css'
import { CART_PAGE, DASHBOARD_PAGE, PRODUCT_PAGE } from '../Routing/RoutePath'
import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub

} from "react-icons/fa";
import { List, ListItem } from '@mui/material'
import { Box } from '@mui/system'
const bgColor = '#f7f7f7'
const SocialShare = [
  { Social: <FaFacebookF />, link: "https://www.facebook.com" },
  { Social: <FaLinkedinIn />, link: "https://www.linkedin.com" },
  { Social: <FaInstagram />, link: "https://www.instagram.com/?hl=en" },
  { Social: <FaTwitter />, link: "https://twitter.com" },
  { Social: <FaGithub />, link: "https://github.com" }
];


export const Footer = () => {
  return (
    <Grid container style={{backgroundColor:bgColor}}>

    <Grid item xs={12} md={3} style={{'marginTop':"60px"}}>
    <Box className='footerMain'>
    <List>
    <ListItem><Typography variant='body2' className='footerHead'>POLICY</Typography></ListItem>
    <ListItem><Link to={DASHBOARD_PAGE} className='footerLink'>Home</Link></ListItem>
    <ListItem><Link to={PRODUCT_PAGE} className='footerLink'>Products</Link></ListItem>
    <ListItem><Link to={CART_PAGE} className='footerLink'>Cart</Link></ListItem>
    </List>
    </Box>
    </Grid>
    <Grid item xs={12} md={3}>
    <Box className='footerMain'>
    <List>
    <ListItem><Typography variant='body2' className='footerHead'>COMPONY</Typography></ListItem>
    <ListItem><Link to={DASHBOARD_PAGE} className='footerLink'>Home</Link></ListItem>
    <ListItem><Link to={PRODUCT_PAGE} className='footerLink'>Products</Link></ListItem>
    <ListItem><Link to={CART_PAGE} className='footerLink'>Cart</Link></ListItem>
    </List>
    </Box>
    </Grid>
    <Grid item xs={12} md={3}>
    <Box className='footerMain'>
    <List>
    <ListItem><Typography variant='body2' className='footerHead'>POPULAR</Typography></ListItem>
    <ListItem><Link to={DASHBOARD_PAGE} className='footerLink'>Home</Link></ListItem>
    <ListItem><Link to={PRODUCT_PAGE} className='footerLink'>Products</Link></ListItem>
    <ListItem><Link to={CART_PAGE} className='footerLink'>Cart</Link></ListItem>
    </List>
    </Box>
    </Grid>
    <Grid item xs={12} md={3}>
    <Box className='footerMain'>
    <Typography variant='body2' className='footerConnect'>CONNECT</Typography>
    <List className='socialList'>
    {SocialShare.map((val, i) => {
      return (
      <ListItem key={i} sx={{listStyle:'none'}}>
        <a href={val.link} className='socialLink'>{val.Social}</a>
      </ListItem>
      )})}
    </List>
    </Box>
    </Grid>
    <Grid item xs={12} md={12}>
    <Typography variant='body2' className='copyright'>Copyright © 2022 Snapdeal. All Rights Reserved.</Typography>
    </Grid>
    </Grid>
  )
}
