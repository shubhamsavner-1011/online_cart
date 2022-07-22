import { Typography } from '@material-ui/core';
import { Box, Button, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useDispatch } from 'react-redux';
import { add } from '../../Store/CartSlice';


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
  const dispatch = useDispatch();
  const {image,category,title,price,brand} = props
  const classes = useStyles();
  const addCart = (id) =>{
      console.log(id,'dispatch>>>.')
      dispatch(add(id))
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
    />
    <CardContent>
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




