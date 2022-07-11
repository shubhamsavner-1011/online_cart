import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../../Store/CartSlice';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import cart from '../../images/cart.jpg'

export const Cart = () => {
  const theme = useTheme();
  const product = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const handleRemove = (element) => {
    dispatch(remove(element))
  }
  return (
    <div className='cartMain'>
      {product.length === 0 ?
        <div>
          <img src={cart} alt='cart' />
        </div> :
        product.map((item) => {
          return <>
            <Card sx={{ display: 'flex', width: '1000', padding: '20px 30px', margin: '20px 0' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={item.image}
                  alt="Live from space album cover"
                />

                <CardContent >
                  <Typography component="div" variant="h5">
                    {`${item.title.slice(0, 20)}...`}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {`${item.description.slice(0, 40)}...`}
                  </Typography>

                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {`$ ${item.price}`}
                  </Typography>
                  <CardActions>
                    <Button variant='outlined' className='addcart' onClick={() => handleRemove(item.id)}>Remove to cart</Button>
                  </CardActions>
                </CardContent>

              </Box>
            </Card>
          </>
        })}
    </div>
  )
}




