import axios from 'axios';
// const API_URL='/api/posts';
const API_URL = 'https://social-media-app-farz.onrender.com/api/posts';
// create new post

const createPost=async(postData,token)=>{
 const config = {
   headers: {
     Authorization: `Bearer ${token}`,
   },
 };
  const response = await axios.post('https://social-media-app-farz.onrender.com/api/posts', postData, config);
  // console.log('data posted');
  return response.data;
}






// const createPost = async (postData, token) => {
//   const config = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(postData),
//   };

//   try {
//     const response = await fetch(API_URL, config);
//     console.log('data posted');
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// };







const getUserFeed = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get('https://social-media-app-farz.onrender.com/api/posts',config);
  // console.log(' getFeedpost is working');
  // console.log(response.data);
  return response.data;
};



const getUserPosts = async (userId,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/' + `${userId}`+ '/posts', config);
  // console.log(' getUserpost is working');
  // console.log(response);
  return response.data;
};


const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL +'/'+postId, config);
  // console.log(response);
  // console.log(' post is deleted');
  return response.data;
};

// const editPost = async (postId,editCaption, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//  const captionData={
//   value:editCaption,
//  }
//   const response = await axios.put(API_URL + '/' + `${postId}`, captionData,config);
//   console.log(response);
//   return response.data;
// };

// const addComment = async (postId,commentValue, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type':'application/json'
//     },
//   };
//  const postData = {
//    value: commentValue,
//  };

//   const response = await axios.put(API_URL + '/'+'comment' + '/'+`${postId}` ,postData,config);
//   console.log(response);
//    console.log(' comment added');
//   return response.data;
// };



const postService = {
  createPost,
  getUserFeed,
  getUserPosts,
  deletePost,
  // editPost,
  // addComment,
};

export default postService;