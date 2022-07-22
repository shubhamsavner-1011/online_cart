import React from 'react'
import { Cards } from '../Card/Cards'
import axios from 'axios';
import react, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';


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
    const classes = useStyles();
    const [data, setData] = useState()
    const [error, setError] = useState()
    console.log(data, 'data');
    useEffect(() => {
        axios.get('https://dummyjson.com/products').
            then((res) => {
                const post = res.data.products;
                setData(post)
            }).
            catch((err) => { setError(err) })
    }, [])

    const filterResult = (catItem) =>{
        const result = data.filter((item)=>{
            return item.category === catItem
        })
        setData(result)

    }
    return (
        <>
        <div className={classes.root}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={()=>filterResult("laptops")}>LAPTOP</Button>
          <Button onClick={()=>filterResult("smartphones")}>SMARTPHONE</Button>
          <Button onClick={()=>filterResult("groceries")}>GROCERRIES</Button>
          <Button onClick={()=>filterResult("fragrances")}>FRAGRANCES</Button>
          <Button onClick={()=>filterResult('skincare')}>SKINCARE</Button>
        </ButtonGroup>
        </div>
            <div className='ProductHead'>CATEGORIES</div>
            <Grid className='cardDiv' contanier>
                {data && data.map(item => {
                    return <Cards image={item.thumbnail} 
                    category={item.category} 
                    title={item.title} 
                    price={item.price} 
                    brand={item.brand}
                    id={item.id}
                    />
                })}
            </Grid>
        </>
    )
}





