import react,{useEffect,useState} from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';




export const Breadcrumb = () => {
const [navigate, setNavigate] = useState()

  useEffect(() => {
   setNavigate(window.location.pathname)
  }, [])

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }
  return (
    <>
    <div role="presentation" onClick={handleClick}>
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        underline="hover"
        color="inherit"
      >
      {navigate}
      </Link>
    </Breadcrumbs>
  </div>
    </>
  )
}


