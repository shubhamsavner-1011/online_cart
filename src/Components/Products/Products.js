import React,{useEffect,useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch,useSelector } from 'react-redux';
import { add } from '../../Store/CartSlice';
import axios from 'axios';
import '../Products/Product.css'
export const Products = () => {
    const [product,setProduct] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        const FetchProduct = async () =>{
            axios.get(`https://fakestoreapi.com/products`)
            .then(response => {
              const posts = response.data;
               setProduct(posts);
            })
        }
        FetchProduct();
    }, [])

  const handleAdd = (element) =>{
    console.log('ele>>>',element);
    dispatch(add(element))
  }

  return (
    <div className='cardMain'>
   {product && product.map(item =>(
    <Card sx={{ maxWidth: 345 }} className='card'>
    <CardMedia
      component="img"
      height="140"
      image={item.image}
      alt="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {`${item.title.slice(0,24)}...`}
      </Typography>
      <Typography variant="body2" color="text.secondary">
      {`${item.description.slice(0,45)}...`}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{m:'10px 0'}}>
       $ {item.price}
      </Typography>
    </CardContent>
    <CardActions sx={{justifyContent:'center'}}>
      <Button variant='outlined' className='addcart' onClick={()=>handleAdd(item)}>Add to cart</Button>
    </CardActions>
  </Card>
   ))}
    </div>
  )
}
