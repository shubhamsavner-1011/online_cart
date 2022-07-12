import React,{useEffect,useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch,useSelector } from 'react-redux';
import { add } from '../../Store/CartSlice';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    console.log('ele>>>',{...element.id});
{element.id === {...element.id}
? console.log('exist')
:console.log('added')
}
dispatch(add(element))
  }

  {if(!product){

    return(
      <div className='progress'>
      <Typography variant='h4'>Loading...</Typography>
      <CircularProgress className='circle'/>
    </div>
    )
  }
  
  else {
    return (

      <div className='cardDiv'>
     {product && product.map(item =>(
      <Card key={item.id} sx={{ width: 345 }} className='card'>
      <CardMedia
        component="img"
        height="140"
        className='cardMedia'
        image={item.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{textAlign:'center'}}>
          {`${item.title.slice(0,24)}...`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {`${item.description.slice(0,40)}...`}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{m:'10px 0',textAlign:'center'}}>
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
  }
}
