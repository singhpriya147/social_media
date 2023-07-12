import axios from 'axios';


// const API_URL = '/api/users/';
// const API_BASE = 'https://social-media-app-farz.onrender.com';
// This code defines a JavaScript function register that sends a POST request to an API endpoint /api/users/ using the axios library. The function takes an argument userData
// (dispatch(register(userData))
// which is an object containing the data that needs to be sent to the API. The function then makes an API call using the axios.post method, passing the API URL and the user data as arguments.

// Once the API returns a response, the code checks if response.data is truthy and, if it is, it stores the data in the browser's local storage using the localStorage.setItem method. This allows the data to persist even if the user refreshes the page. Finally, the function returns the API response data.

// Register user
const register = async (userData) => {
  const response = await axios.post(
    'https://social-media-app-farz.onrender.com/api/users/register',
    userData
  );

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  // console.log('cheking the url = ', `${process.env.BASE_URL}/api/users`);
  // console.log('cheking the url = ', process.env.BASE_URL);
  const response = await axios.post(
    'https://social-media-app-farz.onrender.com/api/users/login',
    userData
  );

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};


const getUser=async(userId,token)=>{
  const config={
    headers:{
      Authorization:`Bearer ${token}`,
    },
  };
  // console.log(userId,token)
  const response = await axios.get(
    `https://social-media-app-farz.onrender.com/api/users/${userId}`,
    config
  );
  // console.log(response.data);
  //     console.log('hello');

  return response.data;

}


// const getAllUser = async ( token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   // console.log(userId,token)
//   const response = await axios.get(API_URL, config);
//   // console.log(response.data);
//   console.log('running all user function ');

  
//   return response.data;
// };


// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
 getUser,
//  getAllUser,
};

export default authService;
