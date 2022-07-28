import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../Store/CartSlice';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import '../Products/Product.css'
import { Box, Grid } from '@mui/material';
import { Cards } from '../Card/Cards';
import Breadcrumb  from '../Breadcumb/Breadcrumb';
import { useLocation } from 'react-router-dom';
import { productss } from '../../Store/ProductDetailSlice';

export const Products = () => {
  const  navigation= useLocation()
  const [product, setProduct] = useState()
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    const FetchProduct = async () => {
      axios.get(`https://dummyjson.com/products`)
        .then(response => {
          const posts = response.data.products;
          setProduct(posts);
          dispatch(productss(posts));
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
        <Grid item xs={12} md={12} sx={{margin:'10px'}}><Breadcrumb navigation={navigation}/></Grid> 
        <div className='ProductHead'>PRODUCTS</div>

        <Grid className='cardDiv' contanier>
        {product && product.map(item => {
            return(
            <>
            <Cards image={item.thumbnail} 
            category={item.category} 
            title={`${item.title.substring(0,25)}...`}
            price={item.price} 
            brand={item.brand}
            id={item.id}
            description={item.description}
            itemImg={item.images}
            key={item}
            />
            </>
            )
        })}
    </Grid>
        </>
      )
    }
  }
}
