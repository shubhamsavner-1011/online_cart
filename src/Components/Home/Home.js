import { Grid } from '@mui/material'
import React from 'react'
import '../Home/Home.css'
import {ProductSlider} from '../Slider/ProductSlider'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';




export const Home = () => {
  return (
    <>

  <Grid container spacing={2} sx={{justifyContent:'space-around'}}>
  <Grid item xs={3}>
  <div className='homeHead'>TOP CATEGORIES</div>
  <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
  <nav aria-label="secondary mailbox folders">
    <List>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary="ELECTRONICS" />
        </ListItemButton>
      </ListItem>
      <Divider className='divider'/>
      <ListItem disablePadding>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary="MOBILE PHONE" />
        </ListItemButton>
      </ListItem>
      <Divider className='divider'/>
      <ListItem disablePadding>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary="LAPTOP" />
        </ListItemButton>
      </ListItem>
      <Divider className='divider'/>
      <ListItem disablePadding>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary="OTHER ACCESSORIES" />
        </ListItemButton>
      </ListItem>
    </List>
  </nav>
</Box>
  </Grid>
  <Grid item xs={8}  className='slider'>
  <ProductSlider/>
  </Grid>
  </Grid>

    </>

  )
}

