import {Typography } from '@mui/material';
import { Box } from '@mui/system';



export const ProductPayment = (props) => {
  const {title,price,brand,image} = props
  console.log(image,'image')


  return (
    <>
          <Box className="copy">
          <Box>
          <img src={image} width={250} height={250}/>
          </Box>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>

          <Typography gutterBottom variant="subtitle1" color="#007185" component="p">
              {brand}
            </Typography>

            <Typography gutterBottom variant="h6" color="textSecondary" component="p">
              $ {price}
            </Typography>
          </Box>
    </>
  )
}







