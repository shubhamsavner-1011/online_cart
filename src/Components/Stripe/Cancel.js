import React from 'react'
import { Box, Grid } from '@material-ui/core'
import cancel from '../../images/paymentFailed.png'

export const Cancel = () => {
  return (
    <Box style={{margin:'70px',height:'52vh'}}>
    <Grid container='true'>
      <Grid item xs={12} md={8}>
        <img src={cancel} style={{textAlign:'center',width:'400px',height:'auto'}}/>
      </Grid>
    </Grid>
    </Box>
  )
}
