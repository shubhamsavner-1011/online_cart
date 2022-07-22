import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { add } from '../../Store/CartSlice';
import CircularProgress from '@material-ui/core/CircularProgress';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import '../Products/Product.css'
import { Box, Grid } from '@mui/material';
import { Cards } from '../Card/Cards';


export const Products = () => {
  const [value, setValue] = React.useState()
  console.log(value,'rating');
  const [product, setProduct] = useState()
  console.log(product , 'product>>');
  const dispatch = useDispatch()

  useEffect(() => {
    const FetchProduct = async () => {
      axios.get(`https://dummyjson.com/products`)
        .then(response => {
          const posts = response.data.products;
          setProduct(posts);
        })
    }
    FetchProduct();
  }, [])

  const handleAdd = (element) => {
    dispatch(add(element))
  }

  {
    if (!product) {

      return (
        <div className='progress'>
          <Typography variant='h4'>Loading...</Typography>
          <CircularProgress className='circle' />
        </div>
      )
    }

    else {
      return (
        <>
        <div className='ProductHead'>PRODUCTS</div>

        <Grid className='cardDiv' contanier>
        {product && product.map(item => {
            return <Cards image={item.thumbnail} 
            category={item.category} 
            title={item.title} 
            price={item.price} 
            brand={item.brand}
            id={item.id}
            />
        })}
    </Grid>
{/* 
        <Grid  className='cardDiv' contanier>
          {product && product.map(item => (
            <Card key={item.id} sx={{ width: 345 }} className='card'>
              <CardMedia
                component="img"
                height="140"
                image={item.thumbnail}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                 {`${item.title.slice(0, 24)}...`} 
                </Typography>

                <Typography variant="h6" color="textSecondary">
                {item.brand}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  {item.category}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  $ {item.price}
                </Typography>
              </CardContent>
              <Box    className='rating'
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Rating
                name="simple-controlled"
             
                value={item.rating}
                onChange={() => {
                  setValue(item.rating);
                }}
              />
              </Box>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button variant='outlined' className='addcart' onClick={() => handleAdd(item)}>Add to cart</Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
        */}
        </>
      )
    }
  }
}
