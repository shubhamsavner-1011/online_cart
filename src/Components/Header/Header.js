import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link, useNavigate, useNavigationType } from 'react-router-dom'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useSelector,useDispatch } from 'react-redux';
import { login,logout, selectUser } from '../../Store/UserSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase';
import { Divider } from '@material-ui/core';
import { CART_PAGE, DASHBOARD_PAGE, LOGIN_PAGE, PRODUCT_PAGE, SIGNUP_PAGE } from '../Routing/RoutePath';




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
    margin:'0 20px'
  },
  link2:{
    textDecoration:'none',
    color:'white'
  },
  link3:{
    textDecoration:'none',
    color:'black'
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
export default function Header({userName,setUserName}) {
console.log(userName,'Header User')
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



  const handleLogout = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
      localStorage.removeItem('token')
      setUserName('')
      console.log('logout successfull');
      navigate(DASHBOARD_PAGE)
      
    }).catch((error) => {
      // An error happened.
      const errorCode = error.code.split('auth/')
      console.log(errorCode,'logout error')
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


      {userName?  
       <div>
       <MenuItem onClick={handleMenuClose}>
       <Link to={PRODUCT_PAGE} className={classes.link3}> Profile </Link>
       </MenuItem>  
       <Divider/>
       <MenuItem onClick={handleMenuClose}>
       <Link to='/' className={classes.link3} onClick={(e) => handleLogout(e)}>Logout</Link>  
       </MenuItem>  
       </div>
        :   
        <div>
        <MenuItem onClick={handleMenuClose}>
        <Link to={LOGIN_PAGE} className={classes.link3}>Login</Link>    
        </MenuItem>
        </div>    
        
      }
     
      <Divider/>
      <MenuItem onClick={handleMenuClose}>
      <Link to={SIGNUP_PAGE} className={classes.link3}> SignUp </Link>
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
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.nav}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
            <Typography className={classes.title} variant="h6" noWrap>
              Snapdeal
            </Typography>
          </IconButton>


          <div className={classes.search}>
            <div className='linkMain'>
              <Typography className={classes.link}>
                <Link color="inherit" to={DASHBOARD_PAGE} className={classes.link1}>
                  Home
                </Link>

                <Link color="inherit" to={PRODUCT_PAGE} className={classes.link1}>
                Product
               </Link>
                <Link color="inherit" to={CART_PAGE} className={classes.link1}>
                  Cart
                </Link>
              </Typography>
{/* 
              <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                className='searchInput'
              />
            </Search>
            */}
            </div>
           
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            <Link color="inherit" to={CART_PAGE} className={classes.link2}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={item.length} color="secondary">
                  <AddShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>

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
  );
}



