import React from 'react'
import Header from './Header'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Button  from '@mui/material/Button'
import {  updateProfile } from '../features/auth/authSlice'
// import Dashboard from '../pages/Dashboard'
import getUser from '../features/auth/authSlice'

const UpdateProfile = () => {
// dispatch(getUser(user._id));
const{user}=useSelector((state)=>state.auth)
// const [user, setUser] = useState({ name: 'guest' });
const dispatch = useDispatch();
// console.log("this is user data before change",user);
// console.log(user);


const token =user.token;
// console.log(token);
 const navigate = useNavigate();

// const[name,setName]=useState(user? user.name:'');
// const[email,setEmail]=useState(user?user.email:'');

const [name, setName] = useState("");
const[email,setEmail]=useState("");

// console.log(user._id);


// useEffect(() => {
//   dispatch(getUser(user._id));
// }, [dispatch, user._id]);


const submitHandler=async(e)=>{
 e.preventDefault();
  
 await dispatch(updateProfile( {name, email},token));
    
    //  setName('');
    //  setEmail('');
 
    // console.log(" buttton clicked")
//  dispatch(getUser(user._id));

  navigate('/');
  
}

//  const getData = async () => {
//    const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    });
//    const user = await res.json();
//    setUser(user);
//    // console.log(user)
//  };



  return (
    <div>
      <Header />
      <div>
        <form
          style={{
            marginLeft: '30%',
            height: ' 400px',
            backgroundColor: ' 	#E0E0E0',
          }}
          onSubmit={submitHandler}
        >
          <h3>Update Profile</h3>
          <input
            type='text'
            value={name}
            placeholder='updated name'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='text'
            value={email}
            placeholder='updated email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type='submit' >Update</Button>
        </form>
      </div>
    </div>
  ); 
}

export default UpdateProfile