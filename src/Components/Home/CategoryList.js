import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { CATEGORY_PAGE } from '../Routing/RoutePath';

const category = [
    {id:1,name: 'ELECTRONICS'},
    {id:2,name:'MOBILE PHONE'},
    {id:3,name:'LAPTOP'},
    {id:4,name:"FURNITURE"},
    {id:5,name:'OTHER ACCESSORIES'}
]



export const CategoryList = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    <nav aria-label="secondary mailbox folders">
      <List>
        {category.map((item)=>(
          <>
          <Link key={item.id} to={CATEGORY_PAGE} style={{textDecoration:'none',color:'#000'}}>
          <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={item.name} />
          </ListItemButton>
          </ListItem>
          </Link>
        <Divider className='divider' />
        </>
        ))}
      </List>
    </nav>
  </Box>
  )
}
