import React,{useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link, useNavigate } from 'react-router-dom'
import InputBase from '@mui/material/InputBase';
import { useSelector} from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase';
import { Divider } from '@material-ui/core';
import * as PATH from '../Routing/RoutePath';
import { CartDrawer } from '../Cart/CartDrawer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    margin: '0 10px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  link: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  link1: {
    textDecoration: 'none',
    color: 'white',
    margin: '0 20px'
  },
  link2: {
    textDecoration: 'none',
    color: 'white'
  },
  link3: {
    textDecoration: 'none',
    color: 'black'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  nav: {
    backgroundColor: '#e40046'
  }
}));


export default function Header({ setUserName}) {

  const navigate = useNavigate()
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const item = useSelector((state) => state.cart.cartItem)
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setUserName('')
      toast.success("Logout Successfull!!",{autoClose:2000})    
      navigate(PATH.DASHBOARD_PAGE)

    }).catch((error) => {
      const errorCode = error.code.split('auth/')
    });
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {localStorage.getItem('token') ?
        <div>
       <MenuItem onClick={handleMenuClose}>
       <Link to={PATH.CART_PAGE}  className={classes.link3}> Cart </Link>
       </MenuItem>
        <Divider />
          <MenuItem onClick={handleMenuClose}>
            <Link to={PATH.PROFILE_PAGE}  className={classes.link3}> Profile </Link>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <Link to={PATH.DASHBOARD_PAGE} className={classes.link3} onClick={(e) => handleLogout(e)}>Logout</Link>
          </MenuItem>
        </div>
        :
        <div>
          <MenuItem onClick={handleMenuClose}>
            <Link to={PATH.LOGIN_PAGE} className={classes.link3}>Login</Link>
          </MenuItem>
        </div>

      }

      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <Link to={PATH.SIGNUP_PAGE} className={classes.link3}> SignUp </Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
     <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      
      </MenuItem>
    </Menu>
  );

  return (
    <>
    <ToastContainer />
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.nav}>
        <Toolbar>
          <Link to={PATH.DASHBOARD_PAGE} style={{ textDecoration: 'none', color: 'white' }}>
            <Typography className={classes.title} variant="h6" noWrap>
              Snapdeal
            </Typography>
          </Link>
          <div className={classes.search}>
            <div className='linkMain'>
              <Typography className={classes.link}>
                <Link color="inherit" to={PATH.DASHBOARD_PAGE} className={classes.link1}>
                  HOME
                </Link>

                <Link color="inherit" to={PATH.PRODUCT_PAGE} className={classes.link1}>
                  PRODUCT
                </Link>

                <Link color="inherit" to={PATH.CATEGORY_PAGE} className={classes.link1}>
                  CATEGORY
                </Link>
              </Typography>
            </div>

          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit" >
              <Badge badgeContent={item.length} color="secondary">
                <CartDrawer className='cartDraw'/>
              </Badge>
            </IconButton>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
    </>
  );
}



