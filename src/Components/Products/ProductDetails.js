import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MagnifyImg } from './MagnifyImg'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { add } from '../../Store/CartSlice';
import { useDispatch } from 'react-redux';
import Breadcrumb from '../Breadcumb/Breadcrumb';
import { Box } from '@material-ui/core';
import { useLocation, useParams,useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import discount from '../../images/discount1.png'
import { productDetails} from '../../Store/ProductDetailSlice';
import axios from 'axios';
import { STRIPE_PAYMENT } from '../Routing/RoutePath';

export const ProductDetails = ({setState}) => {
  const navigation = useLocation()
  const navigate = useNavigate()
  const [number, setNumber] = useState(0);
  const [productDetailsssss, setProductDetail] = useState({});
  const dispatch = useDispatch()
  const { id } = useParams();
  console.log(id,'id-param')
  const { productDetail} = useSelector((state) => state.product);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(response => {
        const posts = response.data;
        setProductDetail(posts);
        dispatch(productDetails(posts))
      })
  }, [])

  const handleTab = (index) => {
    setNumber(index)
  }
  const addCart = (id) => {
    dispatch(add(id))
  }
  const placeOrder = () =>{
    navigate(STRIPE_PAYMENT)
    setState("right", false);
  }

  const { brand, category, title, description, price, images } = productDetailsssss
  return (
    <>
      <Grid item xs={12} md={12} sx={{ margin: '75px' }}><Breadcrumb navigation={navigation} /></Grid>
      <Grid container>
     
        <Grid item xs={12} md={6} sm={6}>
         {images && <MagnifyImg images={images[number]} /> }
            <List className='unorderList'>
          {images && images.map((item, index) => {
              return (
                <ListItem className='listItem' key={index}>
                <img src={item} width='70' height='70' className='listImg' onClick={() => handleTab(index)}/>
              </ListItem>
              )

            })}
          </List> 
        </Grid>
 
        <Grid item xs={12} md={6} sm={6} sx={{ paddingLeft: '20px' }}>
          <div className="copy">
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>

            <Typography gutterBottom variant="subtitle1" color="#007185" component="p">
              {brand}
            </Typography>

            <Typography gutterBottom variant="h6" color="textSecondary" component="p">
              {description}
            </Typography>

            <Typography gutterBottom variant="body2" color="#B12704" component="p">
              {category}
            </Typography>

            <Typography gutterBottom variant="h6" color="textSecondary" component="p">
              $ {price}
            </Typography>
            <Box>
              <Button variant='outlined' className='addcart1' onClick={() => addCart(productDetail)}>Add to cart</Button>
              <Button variant='outlined' className='placeOrder' onClick={placeOrder}>Place Order</Button>
            </Box>
          </div>


          <Box className='emiDiv'>

            <Typography variant='subtitle1' gutterBottom>
              <span style={{ fontWeight: 600 }}>EMI</span> starts at ₹1,483. No Cost EMI available.
            </Typography>

            <Box className='emiSubDiv'>
              <nav aria-label="secondary mailbox folders">
                <List >
                  <ListItem className='emiList'>
                    <ListItemButton>
                      <img src={discount} alt="discount" sx={{ marginRight: '10px' }} className='discountImg' />
                      <ListItemText><span className='emiSpan'>Save Extra</span> with 4 offers</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                  <ListItem className='emiList'>
                    <ListItemButton component="a" href="#simple-list">
                      <ListItemText><span className='emiSpan'>No Cost EMI: </span> Avail No Cost EMI on select cards for orders above ₹3000 </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                  <ListItem className='emiList'>
                    <ListItemButton component="a" href="#simple-list">
                      <ListItemText><span className='emiSpan'>DetailsNo Cost EMI: </span>  Avail No Cost EMI on select cards for orders above ₹3000 </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            </Box>
          </Box>
        </Grid>
      </Grid> 
    </>
  )
}







