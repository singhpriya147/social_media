import React from 'react';
import Card from '@mui/material/Card';
import { useStyles } from './styling';
import { TextField, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { getUser, updateProfile} from '../features/auth/authSlice';
import FlexBetween from './FlexBetween';
import { Box } from '@material-ui/core';
import {Button} from '@mui/material';
import {Link} from 'react-router-dom'


function MyProfile({userId,token}) {
  const [user,setUser]=useState({name:'guest'});
  // const { user } = useSelector((state) => state.auth);
  // console.log(user.following);
  const [followingCount, setFollowingCount] = useState(0)
  
  const [followerCount, setFollowerCount] = useState(
    user.follower ? user.follower.length : 0
  );

  // const id=user._id;
 





  const dispatch = useDispatch();
   const classes = useStyles();
  
  useEffect(()=>{
     getData()
     
       setFollowerCount(user.follower ? user.follower.length : 0);
  },[])



    // useEffect(() => {
    // dispatch(getUser(id));
    //   // setFollowingCount(user.following ? user.following.length : 0);
    //   // setFollowerCount(user.follower ? user.follower.length : 0);
    // }, [id,dispatch]);



 
   const getData = async()=>{
    const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user =await res.json()
    setUser(user)
    // console.log(user)
   }


  




  
  

//  console.log(followingCount);

  return (
    <>
      <Card
        className={classes.userCard}
        sx={{
          height: 350,
          width: 250,
          // display: {
          //   xs: 'none',
          //   md:"block"
          // },
        }}
      >
        <CardMedia
          sx={{
            height: 75,
            width: 75,
            borderRadius: 100,
            borderColor: 'blue',
            mt: 1,
          }}
          component='img'
          height='200'
          image={user.profilePicture}
          alt='no img'
        />
        <CardContent>
          <Typography>{user.name}</Typography>
          <Typography>
            <EmailOutlinedIcon />
            {user.email}
          </Typography>
          <Typography>
            {' '}
            <LocationOnOutlinedIcon />
            {user.location}
          </Typography>
          <Typography>
            {' '}
            <WorkOutlineOutlinedIcon />
            {user.occupation}
          </Typography>

          {user && user.follower ? (
            <Typography> Follower 
              {user.follower.length}

            
             </Typography>
          ) : (
            <Typography>0 </Typography>
          )}
          {user && user.following ? (
            <Typography> Following {user.following.length} </Typography>
          ) : (
            <Typography>0 </Typography>
          )}
          <Link to='/update/profile'>
            <Button  >Update Profile</Button>
          </Link>
          <Link to='/update/password'>
            <Button >Change Password</Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}

export default MyProfile;
