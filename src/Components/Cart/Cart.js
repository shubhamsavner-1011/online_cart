import react, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux'
import { remove, decrement, increment, AllClear, TotalAmount } from '../../Store/CartSlice';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import cart from '../../images/cart.jpg'
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../Cart/Cart.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Breadcrumb from '../Breadcumb/Breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADDRESS_PAGE } from '../Routing/RoutePath';
import { PaymentStepper } from '../Payment-stepper/PaymentStepper';




function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export const Cart = ({setState}) => {
  const navigate = useNavigate()
  const [buy,setBuy] = useState(false)
  const classes = useStyles();
  const theme = useTheme();
  const product = useSelector((state) => state.cart.cartItem);
  console.log(product,'product>>>>')
  const totalAmount = useSelector((state) => state.cart.total)
  const dispatch = useDispatch()
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(TotalAmount())
  }, [product])

  const handleRemove = (id) => {
    dispatch(remove(id))
  }

  const clearCart = () => {
    dispatch(AllClear())
    setOpen(false)

  }
  const buyNow = () => {
    setBuy(true)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 className='ModelHead'>Are you sure clear cart ?</h2>
      <div className='confirmBox'>
        <Button variant='outlined' className='confirm' onClick={clearCart}>Confirm</Button>
        <Button variant='outlined' className='cancel' onClick={handleClose}>Cancle</Button>
      </div>
    </div>
  );
  return (
    <>
      <div className='cartMain'>
        {product.length === 0 ?

          <Grid container>
            <Grid item xs={12} md={12}>
              <img src={cart} alt='cart' className='empty' />
            </Grid>
          </Grid>

          :
          <div>
          {buy ? <PaymentStepper setState={setState}/> : 
            product.map((item) => {
              return <>
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <Card key={item.id} sx={{ display: 'flex', padding: '20px 30px', margin: '20px 0' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                        <CardMedia
                          component="img"
                          sx={{ width: 151 }}
                          image={item.image}
                          alt="Live from space album cover"
                        />

                        <CardContent >
                          {/*   */}  <Typography component="div" variant="h5">
                            {`${item.title.slice(0, 20)}...`}
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary" component="div">
                            {item.brand}
                          </Typography>

                          <Typography variant="subtitle1" color="text.secondary" component="div">
                            {`$ ${parseFloat(item.price * item.cartQuantity).toFixed(2)}`}
                          </Typography>


                          <div className='counting'>
                            <Button variant="outlined" color="primary" className='incrementBtn' onClick={() => dispatch(increment(item.id))}>
                              <AddIcon />
                            </Button>
                            <span className='number'>{item.cartQuantity}</span>
                            <Button variant="outlined" color="primary" className='decrementBtn' onClick={() => dispatch(decrement(item.id))}>
                              <RemoveIcon />
                            </Button>
                          </div>
                          <CardActions className='removeCart'>
                            <Button variant='outlined' className='cancel' onClick={() => handleRemove(item.id)}>Remove</Button>
                          </CardActions>
                        </CardContent>

                      </Box>
                    </Card>
                  </Grid>
                </Grid>

              </>
            })
          }

            <div className='footer'>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {body}
              </Modal>
              <Button variant='outlined' className='addcart' onClick={handleOpen}>Clear Cart</Button>
              <Button variant='outlined' className='confirm' onClick={buyNow}>Buy Now</Button>
              <Typography variant='body2' className='total'>Total Amount : $ {parseFloat(totalAmount).toFixed(2)}</Typography>
            </div>          
            </div>
        
        }

      </div>
    </>
  )
}




