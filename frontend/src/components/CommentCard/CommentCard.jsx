import { Button, Typography } from '@mui/material';
import React,{useState,useEffect}from 'react';
import { Link } from 'react-router-dom';
import './CommentCard.css';
// import { Delete } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFeed } from '../../features/Posts/postSlice';
// import { deleteCommentOnPost } from '../../Actions/Post';
// import { getFollowingPosts, getMyPosts } from '../../Actions/User';
// import getFollowingPosts from '.';
import { deleteComment } from '../../features/Posts/postSlice';
const CommentCard = ({
  userId, // the person who commented
  comment,
  commentId,
  postId,
  token,
  postUser,
  loggedInUser,
}) => {
  const [userInComment, setUserInComment] = useState(null);
  // const { user } = useSelector((state) => state.user);
  // const token=user.token;
  const dispatch = useDispatch();

  const deleteCommentHandle = async () => {
    // console.log(" delete button clicked");
    const commentData={
      id:postId,
      commentId:commentId,
    }

  dispatch(deleteComment(commentData));
  dispatch(getUserFeed());
   window.location.reload();
  };

  useEffect(() => {
    getData(userId);
   
  }, [userId, token]);

  const getData = async () => {
    const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await res.json();
    setUserInComment(user);
 
  };

  if (!userInComment) {
    // User data is loading or not available yet
    return <div>Loading...</div>;
  }

  // console.log(userId);
  return (
    <div className='commentUser'>
      <img src={userInComment.profilePicture} alt={userInComment.name} />
      <Typography
        style={{ minWidth: '6vmax', fontWeight: 'bold', color: 'black' }}
      >
        {userInComment.name}
      </Typography>

      <Typography>{comment}</Typography>
      {loggedInUser === userId ? (
        <Button onClick={deleteCommentHandle}>
          <DeleteIcon />
        </Button>
      ) : loggedInUser === postUser ? (
        <Button onClick={deleteCommentHandle}>
          <DeleteIcon />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
