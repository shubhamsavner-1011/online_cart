import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import '../SignUp/Signup.css'
import { useDispatch, useSelector } from 'react-redux';

export const Profile = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state)
    console.log(data,'?????data');

  return (
    <div>
    <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
                m: 1,
                width: 700,
            },
        }}
        className='formMui'
    >

        <Paper elevation={3} >
        <h3 className='ProductHead'>Profile</h3>
        {/*<h4 className='profileHead'>{data.email}</h4> */}
        
        </Paper>
    </Box>
</div>
  )
}















