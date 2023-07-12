const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updatePassword, updateProfile, deleteProfile, forgotPassword, resetPassword} = require('../controllers/authControllers');
const {
  getUser,
  followUser,
  unfollowUser,
  // getPostOfFollowing,
  getAllUsers,
} = require('../controllers/userController');

const {protect}=require('../middleware/authMiddleware')

router.post('/', registerUser);
router.post('/login', loginUser);

router.get('/:id', getUser);
router.put('/follow/:id',protect,followUser );
router.put('/unfollow/:id', protect, unfollowUser);
router.get('/', protect, getAllUsers);


router.put('/update/password', protect,updatePassword)      // PENDING
router.put('/update/profile', protect, updateProfile);    // PENDING 

// router.delete('/delete/me',protect,deleteProfile);

 router.post('/forgot/password',forgotPassword);  // PENDNG
 router.put('/password/reset/:token',resetPassword) // PENDING
module.exports = router;
