import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import { Input, TextField } from '@material-ui/core';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@material-ui/core';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { getUserFeed } from '../features/Posts/postSlice';
import Box from '@mui/material/Box';
import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';

import DeleteIcon from '@mui/icons-material/Delete';
import { deletePost } from '../features/Posts/postSlice';
import { editPost } from '../features/Posts/postSlice';
import { Button} from '@mui/material';
import { addComment } from '../features/Posts/postSlice';


import CommentCard from './CommentCard/CommentCard';
// import {
//   addCommentOnPost,
//   // deletePost,
//   // likePost,
//   // updatePost,
// } from '../Actions/Post';

export default function PostItem({ post }) {

  const { user } = useSelector((state) => state.auth);

  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [noOfLikes, setNo] = useState(post.likes.length);

  const [commentValue, setCommentValue] = useState('');
  const [commentToggle, setCommentToggle] = useState(false);

  const[editCaption,setEditCaption]=useState('');

const [editCaptionToggle, setEditCaptionToggle] = useState(false);
  //  const[isDelete,setIsDelete]=useState(false);
  //  const[isAccount,setIsAccount]=useState(false);

  //  console.log(post);
  //  console.log(post.likes.length);
  const dispatch = useDispatch();

  const userId = user._id;
  const token = user.token;
  // console.log("logged in user userId")
  // console.log(userId);
  const postId = post._id;
  // console.log(postId);
  const handleLike = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${post._id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          // credentials: 'include',
        }
      );

      if (response.ok) {
        setLiked(true);
        setNo(noOfLikes + 1);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  const handleUnlike = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${post._id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          //  credentials: 'include',
        }
      );

      if (response.ok) {
        setLiked(false);
        setNo(noOfLikes - 1);
      }
    } catch (error) {
      // console.log(error);
    }
  };


  const addCommentHandler = async (e) => {
    e.preventDefault();
    console.log(' post comments');
    console.log(post.comments.length);
    const commentData = {
      id: postId, // Assuming postId is defined
      value: commentValue, // Assuming commentValue is defined
    };
    //  console.log(commentData);
    await dispatch(addComment(commentData));
    // console.log(' after dispatch of addcomment ');
    // if (isAccount) {
    //   dispatch(getMyPosts());
    // } else {
    setCommentValue(''); // Clear the comment input field
      //  setCommentToggle(false);
    await dispatch(getUserFeed());

    // try {

    //   const res= await  dispatch(addComment(commentData));
    //   // update the post locally with the newly added comment
    //    const newCommentId = res.data._id;

    //   const newComment = {
    //     _id: newCommentId, // Replace 'new-comment-id' with the actual ID of the new comment
    //     user: user._id,
    //     comment: commentValue,
    //   };
    //    setCommentValue(''); // Clear the comment input field
    //    setCommentToggle(false);

    //      post.comments((prevComments) => [...prevComments, newComment]);

    // } catch (error) {
    //     console.error('Error adding comment:', error);
    // }
  }





  
  const editCaptionHandler = async(e) => {
     e.preventDefault();
    // console.log(" post caption edited");
    const captionData={
      id:postId,
      value:editCaption,
    }
     await dispatch(editPost(captionData));
     setEditCaption('');
  };

  return (
    <Box>
      <Card
        sx={{
          mb: '1vmax',
          boxShadow: '3',
        }}
      >
        <CardHeader title={post.title} subheader={post.creator} />
        <Typography variant='subheader' color='text.secondary'>
          {new Date(post.createdAt).toLocaleString()}
        </Typography>

        <Typography sx={{ fontSize: 14 }} color='text.secondary'>
          {post.location}
        </Typography>
        <CardMedia
          component='img'
          sx={{ heigth: 140 }}
          image={post.selectedFile}
          alt='Paella dish'
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {post.message}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button>
            {liked ? (
              <Favorite style={{ color: 'red' }} onClick={handleUnlike} />
            ) : (
              <FavoriteBorder style={{ color: 'grey' }} onClick={handleLike} />
            )}
          </Button>
          <Typography>{noOfLikes}</Typography>

          <Button onClick={() => setCommentToggle(!commentToggle)}>
            <ChatBubbleOutline />
            <Typography>{post.comments.length}</Typography>
          </Button>

          <Dialog
            open={commentToggle}
            onClose={() => setCommentToggle(!commentToggle)}
          >
            <div style={{ minwidth: 500, height: '100vh', padding: '2vmax' }}>
              <Typography variant='h4'>Comments</Typography>
              <form
                // style={{ display: 'flex ', margin: '1vmax' }}
                style={{
                  backgroundColor: '#fff',
                  padding: '2rem',
                  borderRadius: '0.5rem',
                  boxShadow: ' 0px 0px 5px #ddd',
                  textAlign: 'center',
                  width: '100%',
                }}
                onSubmit={addCommentHandler}
              >
                <TextField
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder='Comment Here...'
                  required
                 
                />

                <Button type='submit' variant='contained'>
                  Add
                </Button>
              </form>

              {post.comments && post.comments.length > 0 ? (
                post.comments.map((item) => (
                  // console.log(item.user)
                  <CommentCard
                    userId={item.user}
                    // name={item.user.name}
                    // profilePicture={item.user.profilePicture}
                    comment={item.comment}
                    commentId={item._id}
                    key={item._id}
                    postId={postId}
                    // isAccount={isAccount}
                    token={user.token}
                    postUser={post.user}
                    loggedInUser={user._id}
                  />
                ))
              ) : (
                <Typography>No comments Yet</Typography>
              )}
            </div>
          </Dialog>

          {/*  post's userid is same as login id then show delete otherwise dont  */}

          {user._id === post.user ? (
            <IconButton aria-label='delete'>
              <DeleteIcon onClick={() => dispatch(deletePost(post._id))} />
            </IconButton>
          ) : null}

          {user._id === post.user ? (
            <IconButton aria-label='delete'>
              <EditIcon
                onClick={() => setEditCaptionToggle(!editCaptionToggle)}
              />
              <Dialog open={editCaptionToggle}
              onClose={()=>setEditCaptionToggle(!editCaptionToggle)}> 

              <div style={{ minwidth: 500, height: '100vh', padding: '2vmax' }}>
              <Typography variant='h4'>Edit Caption </Typography>
              <form
               
                style={{
                  backgroundColor: '#fff',
                  padding: '2rem',
                  borderRadius: '0.5rem',
                  boxShadow: ' 0px 0px 5px #ddd',
                  textAlign: 'center',
                  width: '100%',
                }}
                onSubmit={editCaptionHandler}
              >
                <TextField
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  placeholder='Caption Here...'
                  required
                  
                />

                <Button type='submit' variant='contained'>
                  Post
                </Button>
              </form>
{/* 
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((item) => (
                  // console.log(item.user)
                  <CommentCard
                    userId={item.user}
                    // name={item.user.name}
                    // profilePicture={item.user.profilePicture}
                    comment={item.comment}
                    commentId={item._id}
                    key={item._id}
                    postId={postId}
                    // isAccount={isAccount}
                    token={user.token}
                    postUser={post.user}
                    loggedInUser={user._id}
                  />
                ))
              ) : (
                <Typography>No comments Yet</Typography>
              )} */}
            </div>
          

              </Dialog>
            </IconButton>
          ) : null}
        </CardActions>
      </Card>
    </Box>
  );
}
