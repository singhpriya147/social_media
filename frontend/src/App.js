
import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import MyPosts from './pages/MyPosts';
import MyProfile from './components/MyProfile';
import Main from './pages/Main';
import UpdateProfile from './components/UpdateProfile';
import UpdatePassword from './components/UpdatePassword';
// import { CssBaseline } from '@mui/material';
function App() {

  return (
    <>
      <Router>
        {/* <CssBaseline /> */}
        <Routes>
          <Route path='/' element={<Main />} />
          {/* <Route path='/' element={<Dashboard />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/Myposts' element={<MyPosts />} />
          <Route path='/update/profile' element={<UpdateProfile />} />
          <Route path='/update/password' element={<UpdatePassword />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App