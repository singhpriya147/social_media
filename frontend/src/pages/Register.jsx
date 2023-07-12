import React from 'react'
import { useState,useEffect } from 'react'
import {toast} from 'react-toastify'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset,register } from '../features/auth/authSlice'
import './Register.css'
import FileBase from 'react-file-base64';



function Register() {
 const [formData,setFormData]=useState({
  name:'',
  email:'',
  password:'',
  password2:'',
  profilePicture:'',
  location:'',
  ocuppation:'',

 })

 const{name,email,password,password2, profilePicture,location,occupation}=formData
const navigate = useNavigate();
 const dispatch=useDispatch()

const { user, isLoading, isError, isSuccess, message } = useSelector(
  (state) => state.auth
);



useEffect(() => {
  if (isError) {
    toast.error(message);
  }
  if (isSuccess || user) {
    navigate('/');
  }
  dispatch(reset());
}, [user, isError, isSuccess, message, navigate, dispatch]);


 const onChange=(e)=>{
 setFormData((prevState)=>({
  ...prevState,
  [e.target.name]:e.target.value,
 }))
 }

 const handleSubmit = (e) => {
   e.preventDefault();
   if(password!==password2){
    // console.log('password odesnt match')
   }
   else{
    const userData={name,email,password,profilePicture,location,occupation}
    console.log(userData)
    dispatch(register(userData))
   };
 };
  return (
    <>
      <div className='container'>
        <div className='header'>
          <h1>registration </h1>
          <p>please register yourself</p>
        </div>
        {/* form section */}
        <form className='form' onSubmit={handleSubmit}>
          <div>
            <input
              type='name'
              id='name'
              name='name'
              value={name}
              placeholder='enter your name'
              onChange={onChange}
            />
          </div>
         
          <div>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder='enter your email'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='password'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='password'
              id='password2'
              name='password2'
              value={password2}
              placeholder='confirm password'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='text'
              id='location'
              name='location'
              value={location}
              placeholder='your location'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='text'
              id='occupation'
              name='occupation'
              value={occupation}
              placeholder='your occupation'
              onChange={onChange}
            />
          </div>
          <div>
            <h3> Add your profile picture</h3>
            <FileBase
              type='file'
              multiple={false}
              placeholder='profile picture'
              onDone={({ base64 }) =>
                setFormData({ ...formData, profilePicture: base64 })
              }
            />
          </div>

          <button type='submit' className='btn'>Submit</button>
        </form>
      </div>
    </>
  );
}

export default Register
