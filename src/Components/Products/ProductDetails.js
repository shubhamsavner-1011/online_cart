import { Button, Grid, Typography } from '@mui/material';
import react,{useState} from 'react'
import { useSelector } from 'react-redux'
import { MagnifyImg } from './MagnifyImg'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { add} from '../../Store/CartSlice';
import { useDispatch } from 'react-redux';
import { Breadcrumb } from '../Breadcrumb';


export const ProductDetails = () => {
  const [index,setIndex] = useState(0);
  const dispatch = useDispatch()

  const handleTab = (id) =>{
      setIndex(id)
  }
  const addCart = (id) =>{
    dispatch(add(id))
  }
  const productDetail = useSelector((state) => state.product.productDetail);
  const {image,brand, category,title,description,price,itemImg,rating} = productDetail

  return (
    <>
    <Grid item xs={12} md={12} sx={{margin:'10px'}}><Breadcrumb/></Grid> 
    <div className='ProductHead'>PRODUCT DETAIL</div>
    <Grid container>
    <Grid item xs={12} md={6} sm={6}>
    <MagnifyImg itemImg={itemImg[index]}/>
    <List className='unorderList'>
    {itemImg.map((item,index) =>(
      <ListItem onClick={()=>handleTab(index)} className='listItem'>
      <img src={item} width='70' height='70'/>
      </ListItem>
      ))}
  </List>
    </Grid>

    <Grid item xs={12} md={6} sm={6}>
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

    <Button variant='outlined' className='addcart' onClick={() => addCart(productDetail)}>Add to cart</Button>
    </div>
    </Grid>
    </Grid>
    </>
  )
}
