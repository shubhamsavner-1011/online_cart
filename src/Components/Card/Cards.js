import { Typography } from '@material-ui/core';
import { Box, Button, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useDispatch } from 'react-redux';
import { add} from '../../Store/CartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCT_DETAIL_PAGE } from '../Routing/RoutePath';
import { productDetails } from '../../Store/ProductDetailSlice';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      margin:'auto'
    },
    media: {
      height: 140,
    },
  });
  

export const Cards = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {image,category,title,price,brand,description,itemImg} = props
  const classes = useStyles();
  const addCart = (id) =>{
      dispatch(add(id))
  }
  const prouductDetail = (id) =>{
  //  dispatch(productDetails(id))
   navigate(PRODUCT_DETAIL_PAGE+id.id);
  }
  return (
    <>
  <Grid item xs={12} md={4} lg={3} sx={{margin:'20px 0'}}>
  <Card className={classes.root}>
  <CardActionArea>
    <CardMedia
      className={classes.media}
      image={image}
      height='140'
      title="Contemplative Reptile"
      onClick={() =>prouductDetail(props)}
    />
    <CardContent  onClick={() =>prouductDetail(props)}>
      <Typography gutterBottom variant="h5" component="h2">
      {title}
      </Typography>
      
      <Typography variant="h6" color="textSecondary" component="p">
        {brand}
      </Typography>

      <Typography variant="body2" color="textSecondary" component="p">
        {category}
      </Typography>

      <Typography variant="h6" color="textSecondary" component="p">
        $ {price}
      </Typography>
    </CardContent>
  </CardActionArea>
  <CardActions sx={{ justifyContent: 'center' }}>
  <Button variant='outlined' className='addcart' onClick={() => addCart(props)}>Add to cart</Button>
  </CardActions>
</Card>
</Grid>

</>
  )
}




