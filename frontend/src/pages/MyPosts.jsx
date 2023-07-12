import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {getUserPosts} from '../features/Posts/postSlice';
import Header from '../components/Header';
import { Box, Typography } from '@material-ui/core';
import PostItem from '../components/PostItem';
function MyPosts() {

  // const [post,setPost]=useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
   const{posts}=useSelector((state)=>state.post)
  //  console.log(user._id,user.token)

 const userId=user._id;
 const token=user.token;

 useEffect(() => {
  dispatch(getUserPosts(userId));

  //  getUserPosts();
 }, [userId, token]);


  // const getUserPosts = async () => {
  //   const res = await fetch(`http://localhost:5000/api/posts/:${userId}/posts`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const post = await res.json();
  //   setPost(post);
  //   console.log(post)
  // };

  return (
    <>
    <Header/>
      <Box sx={{ padding: '3rem', width: 500, alignContent: 'center' }}>
        {posts.length > 0 ? (
          <Box sx={{ width: 500, height: 300 }}>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </Box>
        ) : (
          <Typography>You have not set any memories</Typography>
        )}
      </Box>
    </>
  );
}

export default MyPosts;