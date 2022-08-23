import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {Login} from '../Login/Login';
import {Cart} from '../Cart/Cart'



const useStyles = makeStyles({
  list: {
    width: 600,
    padding:'20px'
  },
  fullList: {
    width: 'auto',
  },
});

export const CartDrawer = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <Cart setState={setState}/>     
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} className='shoppingBtn'><AddShoppingCartIcon width={24}/></Button>
          <Drawer anchor={anchor}  open={state[anchor]} onClose={toggleDrawer(anchor, false)} >
          {localStorage.getItem('token') ? list(anchor) : <Login/>}
        </Drawer>       
        </React.Fragment>
      ))}
    </div>
  );
}
