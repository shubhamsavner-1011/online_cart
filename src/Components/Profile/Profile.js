import react, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import '../SignUp/Signup.css'
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import '../Profile/profile.css'
import { Link } from 'react-router-dom';
import { Address } from './Address';
import { ADDRESS_PAGE } from '../Routing/RoutePath';
import { collection, doc, getDocs, orderBy } from "firebase/firestore";
import { auth, db ,storage} from '../../Firebase/Firebase';




export const Profile = () => {
  const [newData, setData] = useState();

  const UID = localStorage.getItem('uid');
  const getUser = newData && UID && newData?.filter((i) => i.id == UID)[0];

  useEffect(() => {
    const getData = async () => {
      const userData = await getDocs(collection(db, "users"));
      setData(userData.docs.map((doc) => ({ ...doc.data() })));
    };

    getData();
  }, []);



  return (
    <>
    {getUser && <div className='profile'>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 400,
          },
        }}
        className='formMui'
      >

        <Paper elevation={3} >
          <h3 className='ProductHead'>Profile</h3>

          <Box sx={{ padding: '20px' }}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" style={{ width: '80px', height: '80px' }} />
            </Stack>
            <Typography variant='body2'>{getUser.values.name}</Typography>
            <Typography variant='body2'>{getUser.values.email}</Typography>
            <Link to={ADDRESS_PAGE} className='address'><Typography variant='body2'>Save Address</Typography> </Link>
          </Box>
        </Paper>
      </Box>
    </div> }
    </>
  )
}

















