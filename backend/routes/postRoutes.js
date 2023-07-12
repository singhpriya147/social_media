const express =require('express');
const {
  getUserPosts,
  createPost,
  editPost,
  likePost,
  deletePost,
  getPostOfFollowing,
  CommentOnPost,
  deleteComment,
} = require('../controllers/postControllers');


 const router =express.Router();


 const {protect}=require('../middleware/authMiddleware')


 router.post('/',protect, createPost);

  // router.get('/', protect, getFeedPosts);
  router.get('/', protect, getPostOfFollowing);


 router.put('/:id',protect, editPost);     // done

 router.delete('/:id', protect, deletePost);

  router.get('/:userId/posts', protect, getUserPosts);

  router.get('/:id', protect, likePost);


  
  router.put('/comment/:id',protect,CommentOnPost) // done
 router.delete('/comment/:id',protect,deleteComment);  // done // why doesn't refresh properly ----->PENDING

 module.exports= router;