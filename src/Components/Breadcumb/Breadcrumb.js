
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import '../Breadcumb/Breadcrumb.css'
import { useNavigate } from 'react-router-dom';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const Breadcrumb = (props) => {
const navigate = useNavigate()
const {navigation} = props;
const pathname = navigation.pathname.split("/").filter(x => x);

  return (
    <div role="presentation" onClick={handleClick}>
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" className='crumbLink' onClick={() => navigate('/')}>
        HOME
      </Link>

      {pathname.map((path,index) =>{
        const isLast = index === pathname.length-1;
        const route = `/${pathname.slice(0,index+1).join("/")}`;
        return (
          <div>
        {isLast?
        <Typography key={path.toString()}> {path}</Typography>
        :
        <Link
        underline="hover"
        color="inherit"
        href="/material-ui/getting-started/installation/"
        onClick={()=>navigate(route)}
        >
        {path}
      </Link>
        }
        
      </div>
      )})}
      
    </Breadcrumbs>
  </div>
  )
}

export default Breadcrumb;




