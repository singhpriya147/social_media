import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from '../components/PostForm';
import PostItem from '../components/PostItem';
import Header from '../components/Header'
import { reset } from '../features/auth/authSlice';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import { useMediaQuery } from '@mui/material';
import MyProfile from '../components/MyProfile';
import { Box, Card, Typography } from '@material-ui/core';
import { flexbox } from '@mui/system';
import { getUserFeed } from '../features/Posts/postSlice';
import {Grid} from '@material-ui/core'
import { getUser } from '../features/auth/authSlice';
// import { getAllPerson } from '../features/auth/authSlice';
// import { Container } from '@mui/material';

import UserItem from '../components/UserItem'
import FlexBetween from '../components/FlexBetween';
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  // const [posts, setPosts] = useState([]);
  const [persons, setPersons] = useState([]);
  const [index,setIndex]=useState(0);
  const {posts} = useSelector(
    (state) => state.post
  );
  // console.log(posts.posts.length);
   const isNonMobileScreens = useMediaQuery('(min-width:960px)');
 

  // const userId = user._id;
  const token = user.token;

  useEffect(() => {

     dispatch(getUserFeed());
    // getUserFeed();
    //  console.log(" after dispatch of getuserfeed");
  
    // dispatch(getUser())
     getAllPerson();

    //  .then((response)=>{
    //     setPersons(response.data.users);
    //     // console.log(response.data);

    //  })
    //  .catch((error)=>{
    //   console.error(error);
    //  })
    // return () => {
    //   dispatch(reset());
    // };
  }, [])

 










  // const getUserFeed = async () => {
  //   const res = await fetch(`http://localhost:5000/api/posts`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const post = await res.json();

  //   setPosts(post.posts);

  //   console.log(post);
  // };

  const getAllPerson = async () => {

    try{
    const res = await fetch(`http://localhost:5000/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const allUsers = await res.json();

    // console.log(allUsers.users);
    setPersons(allUsers.users);
    
    }
    catch(error){
  // console.error(error);
  
    }
  };


  
  

 







  return (
    <>
      <Header />

      {isNonMobileScreens ? (
        <Box
          sx={{
            // width: '100vh',
            padding: '2rem',
            gap: '0.5rem',
            display: 'flex',
            flexDirection: 'row',
            // bgcolor: 'red',
          }}
          // justifyContent= 'center'
        >
          {/* loggedin user profile */}
          <Box sx={{ bgcolor: 'green', display: { xs: 'none', md: 'block' } }}>
            {user ? (
              <MyProfile key={user._id} userId={user._id} token={user.token} />
            ) :null}
          </Box>

          {/*  form for post */}
          <Box>
            <PostForm />

            {/*  feed area */}
            <Box
              sx={{
                paddingTop: '3rem',
              }}
            >
              {posts.posts && posts.posts.length > 0 ? (
                <Box>
                  {posts.posts.map((post) => (
                    <PostItem key={post._id} post={post} />
                  ))}
                </Box>
              ) : (
                <Typography>You have not set any memories</Typography>
              )}
            </Box>
          </Box>

          {/* avilable user to follow */}
          <Box
            sx={{
              alignContent: 'center',
              bgcolor: 'orange',
              display: { xs: 'none', md: 'block' },
            }}
          >
            {persons ? (
              persons.length > 0 ? (
                <Box
                // sx={{ width: 300, height: 300 }}
                >
                  {persons.map((person) => (
                    <UserItem key={person._id} person={person} />
                  ))}
                </Box>
              ) : (
                <Typography>no user available to follow</Typography>
              )
            ) : (
              <Typography>Loading...</Typography>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            // width: '100vh',
            padding: '2rem',
            gap: '0.5rem',
            display: 'flex',
            flexDirection: 'row',
            // bgcolor: 'red',
          }}
          // justifyContent= 'center'
        >
          {/* loggedin user profile */}

          {/*  form for post */}
          <Box>
            <PostForm />
            <Box
              sx={{
                bgcolor: 'green',
                //  display: { xs: 'none', md: 'block' }
              }}
            >
              {user ? (
                <MyProfile
                  key={user._id}
                  userId={user._id}
                  token={user.token}
                />
              ) : null}
            </Box>
            {/*  feed area */}
            <Box
              sx={{
                paddingTop: '3rem',
              }}
            >
              {posts.posts && posts.posts.length > 0 ? (
                <Box>
                  {posts.posts.map((post) => (
                    <PostItem key={post._id} post={post} />
                  ))}
                </Box>
              ) : (
                <Typography>You have not set any memories</Typography>
              )}
            </Box>
          </Box>

          {/* avilable user to follow */}

          <Box
            sx={{
              alignContent: 'center',
              // bgcolor: 'orange',
              // display: { xs: 'none', md: 'block' },
            }}
          >
            {persons ? (
              persons.length > 0 ? (
                <Box
                // sx={{ width: 300, height: 300 }}
                >
                  {persons.map((person) => (
                    <UserItem key={person._id} person={person} />
                  ))}
                </Box>
              ) : (
                <Typography>no user available to follow</Typography>
              )
            ) : (
              <Typography>Loading...</Typography>
            )}
          </Box>
        </Box>
      )}

      {/* <Box
        sx={{
          // width: '100vh',
          padding: '2rem',
          gap: '0.5rem',
          display: 'flex',
          flexDirection: 'row',
          
        }}
       
      > */}
      {/* loggedin user profile */}
      {/* <Box sx={{ bgcolor: 'green', display: { xs: 'none', md: 'block' } }}>
          {user ? (
            <MyProfile key={user._id} userId={user._id} token={user.token} />
          ) : null}
        </Box> */}

      {/*  form for post */}
      {/* <Box>
          <PostForm />

          {/*  feed area */}
      {/* <Box
            sx={{
              paddingTop: '3rem',
            }}
          >
            {posts.posts && posts.posts.length > 0 ? (
              <Box>
                {posts.posts.map((post) => (
                  <PostItem key={post._id} post={post} />
                ))}
              </Box>
            ) : (
              <Typography>You have not set any memories</Typography>
            )}
          </Box> */}
      {/* </Box> */}

      {/* avilable user to follow */}
      {/* <Box
          sx={{
            alignContent: 'center',
            bgcolor: 'orange',
            display: { xs: 'none', md: 'block' },
          }}
        >
          {persons ? (
            persons.length > 0 ? (
              <Box sx={{ width: 300, height: 300 }}>
                {persons.map((person) => (
                  <UserItem key={person._id} person={person} />
                ))}
              </Box>
            ) : (
              <Typography>no user available to follow</Typography>
            )
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box> */}
      {/* </Box> */}
    </>
  );
}

export default Dashboard;
