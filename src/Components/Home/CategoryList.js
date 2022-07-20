import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const category = [
    {name: 'ELECTRONICS'},
    {name:'MOBILE PHONE'},
    {name:'LAPTOP'},
    {name:"FURNITURE"},
    {name:'OTHER ACCESSORIES'}
]



export const CategoryList = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    <nav aria-label="secondary mailbox folders">
      <List>
        {category.map((item)=>(
          <>
          <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
        <Divider className='divider' />
        </>
        ))}
      </List>
    </nav>
  </Box>
  )
}
