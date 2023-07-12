import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { updatePassword } from '../features/auth/authSlice';
import { useState } from 'react';
 import Header from './Header';
 import { Button } from '@mui/material';
 import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';



const UpdatePassword = () => {
 const [oldPassword,setOldPassword]=useState();
 const [newPassword,setNewPassword]=useState();
 const dispatch=useDispatch();
 const navigate= useNavigate();

 const submitHandler=async(e)=>{
e.preventDefault();
await dispatch(updatePassword({oldPassword,newPassword}));

//  navigate('/login');
  dispatch(logout());
 }
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
          <h3>Update Password</h3>
          <input
            type='password'
            value={oldPassword}
            placeholder='old password'
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type='password'
            value={newPassword}
            placeholder='New password'
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button type='submit'>Update password</Button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword