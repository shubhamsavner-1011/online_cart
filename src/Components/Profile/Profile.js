import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "../Sign-up/Signup.css";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import "../Profile/profile.css";
import { Link, useNavigate } from "react-router-dom";
import { ADDRESS_PAGE, DASHBOARD_PAGE, PROFILE_PAGE } from "../Routing/RoutePath";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage ,auth} from "../../Firebase/Firebase";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import { photoURL } from "../../Store/ProductDetailSlice";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import avatar from '../../images/avatar.jpg'
import { getAuth} from "firebase/auth";
import { deleteDoc } from "firebase/firestore";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  background: "white",
}));

export const Profile = () => {
  const photourl = useSelector((state) => state.product.photo);
  const navigate = useNavigate()
  const [images,setImage] = useState()
  const [photos, setUrl] = useState();
  const [toggle, setToggle] = useState(true);
  const [error, setError] = useState();
  const [newData, setData] = useState();
  const [address, setAddress] = useState();
  const [profile, setProfile] = useState();
  const [progress, setProgress] = React.useState(0);
  const [value, setValue] = useState();
  const UID = localStorage.getItem("uid");
  const getUser = newData && UID && newData?.filter((i) => i.id == UID)[0];
  const getAddress = address && UID && address?.filter((i) => i.id == UID)[0];
  const getProfile = profile && UID && profile?.filter((i)=>i.id==UID)[0];
  const dispatch = useDispatch();
  dispatch(photoURL(photos))
  const classes = useStyles();

  useEffect(() => {
    const getData = async () => {
      const userData = await getDocs(collection(db, "users"));
      setData(userData.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      const userAddress = await getDocs(collection(db, "address"));
      setAddress(userAddress.docs.map((doc) => ({ id:doc.id ,...doc.data() })));

      const userProfile = await getDocs(collection(db, "images"));
      setProfile(userProfile.docs.map((doc) => ({ id:doc.id ,...doc.data() })));
    };
    getData();
  }, [toggle]);
   const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const deleteCurrentUser = async() =>{
    const auth = getAuth();
    const user = auth.currentUser.uid
    await deleteDoc(doc(db, "users", user)).then(()=>{
      toast.success("User Deleted !!", { autoClose: 2000 });
      localStorage.clear()
      navigate(DASHBOARD_PAGE)
    }).catch(e=>{setError(e.message,'error')})
  }
  
  const onSubmit = () =>{
    const imageRef = ref(storage, 'image')
    uploadBytes(imageRef,images).then(()=>{
      getDownloadURL(imageRef).then((url)=>{
        setUrl(url)

        onAuthStateChanged(auth, (user) => {
          const uid =  user.uid;
          try {
           const data = {
            id:uid,
            photourl:url
           };
           setDoc(doc(db, 'images', uid) , data).then(() => {
            setToggle(pre=>!pre)
            const timer = setTimeout(() => {
              setProgress((oldProgress) => {
                if (oldProgress === 100) {
                  return 0;
                }
                const diff = 30* 10;
                return Math.min(oldProgress + diff, 100);
              });
            },3000);
        
            return () => {
              clearInterval(timer);
            };
           }).catch(e => {
            setError(e.message)                
           })
         } catch (e) {
          setError(e.message) 
         } 
       });
      }).catch((error)=>setError(error.message) )
      setImage(null)
    }).catch((err)=>setError(err.message) )
 
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          marginTop:'75px',
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 400,
          },
        }}
        className="formMui"
        getAddress={getAddress}
      >
        <Paper elevation={3} className="profile">
        <div className={classes.root}>
        <LinearProgress variant="determinate" value={progress} />
        </div>
          <Box>
            <h3 className="ProductHead">Profile</h3>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <SmallAvatar>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleChange}
                      />
                      <PhotoCamera  sx={{color:'black'}}/>
                    </IconButton>
                  </SmallAvatar>
                }
              >
                <Avatar
                  alt="Travis Howard"
                  src={getProfile ? getProfile.photourl : avatar}
                  className="avatar"
                />
              </Badge>
            </Stack>
         
            <Box sx={{textAlign:'center'}}>
            <Button onClick={onSubmit} sx={{textAlign:'center',color:'black'}}>Upload Profile</Button>
            </Box>
            {getUser && (
              <Box sx={{ padding: "20px" }}>
                <Typography variant="h5">{getUser.name}</Typography>
                <Typography variant="subtitle1" color="gray">
                  {getUser.email}
                </Typography>

                {getAddress && (
                  <>
                    <Box>
                      <Typography variant="body2">
                        {getAddress.address}
                      </Typography>
                      <Typography variant="body2">
                        {getAddress.locality}
                      </Typography>
                      <Typography variant="body2">{`${getAddress.city} , ${getAddress.state}`}</Typography>
                    </Box>
                  </>
                )}
                <Link to={ADDRESS_PAGE} className="address">
                  <Typography variant="body2">Add/Edit Address</Typography>
                </Link>
                <Link to={PROFILE_PAGE} className="address" onClick={deleteCurrentUser}>
                <Typography variant="body2">Delete User</Typography>
              </Link>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </>
  );
};







