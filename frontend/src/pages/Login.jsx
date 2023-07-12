// import React, { useEffect, useState } from 'react'
// import {toast} from 'react-toastify';
// import {useDispatch,useSelector} from 'react-redux'
// import { login,reset } from '../features/auth/authSlice'
// import { useNavigate } from 'react-router-dom'

// import { Link } from 'react-router-dom';

// const Login = () => {
// const [formData,setFormData]=useState({
//  email:'',
//  password:'',
// })
//  const{email,password}=formData;
//  const dispatch=useDispatch();
// const navigate=useNavigate()


// const{user,isLoading,isError,isSuccess,message}=useSelector((state)=>state.auth)



// useEffect(()=>{
//   console.log("inside useffect of login fucntion ") 
//   if(isError){
//     console.log(" error");
//     // toast.error(message);
//   }
//   if(isSuccess || user){
//     navigate('/');
//   }
  
//   dispatch(reset());

// },[user,isError,isLoading,isSuccess,message,navigate,dispatch])


// const onChange=(e)=>{
// setFormData((prevState)=>({
// ...prevState,
// [e.target.name]:e.target.value,
// }))
// };

// const onSubmit=(e)=>{
// e.preventDefault();

// console.log(" you submit the login form");
// const userData={
//   email,
//   password,
// }
// console.log(userData)
// dispatch(login(userData));
// }



//   return (
//     <>
//       <div className='container'>
//         <div className='left-container'>
         

//           <div className='text'>
//             <h1>Welcome</h1>
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua.
//             </p>
//           </div>
//         </div>
//         <div className='right-container'>
//           <section className='right-header'>
//             <h2>Login</h2>
//             <p>please login to your account</p>
//           </section >
//           {/* form section  */}
//           <section className='right-form' >
//             <form onSubmit={onSubmit}>
//               {/* div for form field */}

//               <div>
//                 <input
//                   type='email'
//                   id='email'
//                   name='email'
//                   value={email}
//                   placeholder='enter your email'
//                   onChange={onChange}
//                 />
//               </div>

//               <div>
//                 <input
//                   type='password'
//                   id='password'
//                   name='password'
//                   value={password}
//                   placeholder='enter your password'
//                   onChange={onChange}
//                 />
//               </div>

//                 <button type='submit' className='btn'>
//                   Submit
//                 </button>
             
//             </form>
//           </section>
//           {/*  for register section */}
//           <section>
//             Need an Account ?{' '}
//             <Link to='/register'>
//               <span> Sign Up</span>
//             </Link>
//           </section>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login


import React, { useEffect, useState } from 'react'

import {useDispatch,useSelector} from 'react-redux'

import { login,reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom';
 import { Link } from 'react-router-dom';
import './Login.css';
// import Button from './components/Button';

const Login = () => {
const [formData,setFormData]=useState({
 email:'',
 password:'',
})
 const{email,password}=formData;
 const dispatch=useDispatch();
const navigate=useNavigate()


const{user,isLoading,isError,isSuccess,message}=useSelector((state)=>state.auth)



useEffect(()=>{
  // console.log("inside useffect of login fucntion ") 
  if(isError){
    // console.log(" error");
    // toast.error(message);
  }
  if(isSuccess || user){
    navigate('/');
  }
  
  dispatch(reset());

},[user,isError,isLoading,isSuccess,message,navigate,dispatch])


const onChange=(e)=>{
setFormData((prevState)=>({
...prevState,
[e.target.name]:e.target.value,
}))
};

const onSubmit=(e)=>{
e.preventDefault();

// console.log(" you submit the login form");
const userData={
  email,
  password,
}
// console.log("loging data", userData)
dispatch(login(userData));
}



  return (
    <>
      <div className='container'>
        <div className='header'>
          <h2>Login</h2>
          <p>please login to your account</p>
        </div>

        {/* form section  */}

        <form className='form' onSubmit={onSubmit}>
          {/* div for form field */}

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
              placeholder='enter your password'
              onChange={onChange}
            />
          </div>

          <button type='submit' className='btn'>
            Submit
          </button>
        </form>

        {/*  for register section */}
        <div>
          Need an Account ?{' '}
          <Link to='/register'>
            <span> Sign Up</span>
          </Link>
        </div>
      </div>
    </>
  );
}
export default Login