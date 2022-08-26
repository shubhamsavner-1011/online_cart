import { Box, Grid } from '@material-ui/core'
import React from 'react'
import success from '../../images/Payment-success.png'

export const Success = () => {
  return (
    <Box style={{margin:'70px',height:'52vh'}}>
        <Grid container='true'>
          <Grid item xs={12} md={8}>
            <img src={success} style={{textAlign:'center',width:'400px',height:'auto'}}/>
          </Grid>
        </Grid>
    </Box>
  )
}
