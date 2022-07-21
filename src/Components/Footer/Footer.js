import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import '../Footer/Footer.css'
import { CART_PAGE, DASHBOARD_PAGE, PRODUCT_PAGE } from '../Routing/RoutePath'
export const Footer = () => {
  return (
    <Grid container >
    <Grid item xs={12} md={3}>
     <div className='footerMain'>
     <Typography variant='body2' className='footerHead'>POPULAR LINKS</Typography>
     <Link to={DASHBOARD_PAGE} className='footerLink'>Home</Link>
     <Link to={PRODUCT_PAGE} className='footerLink'>Products</Link>
     <Link to={CART_PAGE} className='footerLink'>Cart</Link>
     </div>
     
    </Grid>
    <Grid item xs={12} md={3}>
    <Typography variant='body2' className='footerHead'>POLICY INFO</Typography>
    </Grid>
    <Grid item xs={12} md={3}>
    <Typography variant='body2' className='footerHead'>COMPONY</Typography>
    </Grid>
    </Grid>
  )
}
