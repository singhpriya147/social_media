import React, { useEffect } from 'react'
import Dashboard from './Dashboard'
import Login from './Login'
import { useNavigate } from 'react-router-dom';

function Main() {
 const x = localStorage.getItem('user');
 const navigate = useNavigate()

 useEffect(()=>{
  if(!x){
 navigate('/login');
  }
 },[x])

 if(x){
return <Dashboard />;
 }
  
 
}

export default Main