import React from 'react'
import { Cards } from '../Card/Cards'
import axios from 'axios';
import react, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumb  from '../Breadcumb/Breadcrumb';
import { useLocation} from 'react-router-dom';
import '../Category/Category.css';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

export const Category = () => {
    const navigation = useLocation();
    const classes = useStyles();
    const [data, setData] = useState()
    const [updateData,setUpdateData] = useState()
    const [error, setError] = useState()
    useEffect(() => {
        axios.get('https://dummyjson.com/products').
            then((res) => {
                const post = res.data.products;
                setData(post)
                setUpdateData(post)
            }).
            catch((err) => { setError(err) })
    }, [])

    const filterResult = (catItem) =>{
        const result = data.filter((item)=>{
            return item.category === catItem
        })
        setUpdateData(result)

    }
    return (
        <>
        <Grid item xs={12} md={12} sx={{margin:'75px'}}><Breadcrumb navigation={navigation}/></Grid> 
        <div className={classes.root}>
        <ButtonGroup color="#fff" aria-label="outlined primary button group" className='btnGroup'>
        <Button onClick={()=>setUpdateData(data)}>ALL</Button>
          <Button onClick={()=>filterResult("laptops")}>LAPTOP</Button>
          <Button onClick={()=>filterResult("smartphones")}>SMARTPHONE</Button>
          <Button onClick={()=>filterResult("groceries")}>GROCERRIES</Button>
          <Button onClick={()=>filterResult("fragrances")}>FRAGRANCES</Button>
          <Button onClick={()=>filterResult('skincare')}>SKINCARE</Button>
        </ButtonGroup>
        </div>
            <div className='ProductHead'>CATEGORIES</div>
            <Grid className='cardDiv' contanier>     
                    {updateData && updateData.map(item => {
                    return <Cards image={item.thumbnail} 
                    category={item.category} 
                    title={`${item.title.substring(0,22)}...`} 
                    price={item.price} 
                    brand={item.brand}
                    id={item.id}
                    description={item.description}
                    itemImg={item.images}
                    />
                })}
            </Grid>
        </>
    )
}





