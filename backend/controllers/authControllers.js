const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModels');
const PostMessage = require('../models/postModels');
const { sendEmail } = require("../middleware/sendEmail");
// const {generateToken}=requires('../middleware/generteToken')

const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    profilePicture,
    friends,
    location,
    occupation,
  } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('pleasd add filed');
  }

  // check if user exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('user already exist');
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create a user

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    profilePicture: req.body.profilePicture,
    friends,
    location,
    occupation,
  });

  //  console.log(req.body.profilePicture);

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('invalid user data');
  }

  // res.status(200).json({ message: 'register user' });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // find user in database by email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('invalid credential');
  }
});

// update a password
// paasword is not hashing

const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user._id;
  // console.log(userId)

  try {
    const user = await User.findById(req.user._id);
    // const user = await User.findById(userId);
    // console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }

    // if (!oldPassword || !newPassword) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Please provide old and new password',
    //   });
    // }
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect old password',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    // console.log(error)
  }
});

// update profile
// the name is not changing

const updateProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('name')
      .populate('email');
    const { name, email } = req.body;
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: 'profile updated',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// const deleteProfile=async(req,res)=>{
//   try{
//  const user=await User.findById(req.user._id);
//  console.log(user);
//  const posts=user.posts;

//  const follower=user.follower;
//  const following=user.following
//  const userId=user._id;
//  await user.remove();
//  // logout user
// //  localStorage.removeItem('user');
//  for(let i=0;i<posts.length;i++){
//   const post = await PostMessage.findById(posts[i]);
//   await post.remove();
//  }
// console.log(posts);
//  // delete users from followers following
//  for(let i=0;i<follower.length;i++){
//   const follower=await User.findById(follower[i]);
//   const index=follower.following.indexOf(userId);
//   follower.following.splice(index,1);
//   await follower.save();
//  }
// // REMOVING USERS FROM FOLLOWINGS FOLLOWERS
//  for (let i = 0; i < following.length; i++) {
//    const follows = await User.findById(following[i]);
//    const index = follows.following.indexOf(userId);
//    follows.following.splice(index, 1);
//    await follows.save();
//  }

//  res.status(200).json({
//   success:true,
//   message:"profile deleted",
//  })
//   }
//   catch(error){
// res.status(500).json({
//   success:false,
//   message:error.message,
// })
//   }
// }

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'user not found',
      });
    }

    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/users/password/reset/${resetPasswordToken}`;
    //  console.log(resetUrl);
    const message = `Reset your password by clicking the link below :\n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'reset password',
        message,
      });
      res.status(200).json({
        success: true,
        message: `email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: ' token is invalid or has expired',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // user.password=req.body.password;
    user.password = hashedPassword;
    (user.resetPasswordToken = undefined),
      (user.resetPasswordExpire = undefined),
      await user.save();
    res.status(200).json({
      success: true,
      message: ' password reset successfull',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// geneerate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: '120d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  updatePassword,
  updateProfile,
  // deleteProfile,
  forgotPassword,
  resetPassword,
};
