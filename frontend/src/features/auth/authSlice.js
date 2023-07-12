import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
// async thunk function -that deal with async data backend

// Get user which contain basic user data and a token  from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};
//register user

// 'auth/register' is action user is passed in from register component  and dispatch register form there

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    //make a request
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// get   a user
export const getUser=createAsyncThunk('auth/getUser',async(id,thunkAPI)=>{
  try {
    const token = thunkAPI.getState().auth.user.token;
    // console.log(token);
     const response = await fetch(
       `https://social-media-app-farz.onrender.com/api/users/${id}`,
       {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
         },
       }
     );
     const data=await response.json();
    //  console.log(data);
     return data;

  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
    // return message
  }
})

// get all users available 

   export const getAllPerson = createAsyncThunk ('auth/getAllPerson',async(_,thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // console.log(token);



      
     const response = await fetch(
       `https://social-media-app-farz.onrender.com/api/users`,
       {
         //  const response = await fetch(`process.env.BASE_URL/api/users`, {
         method: 'GET',
         headers: {
           Authorization: `Bearer${token}`,
         },
       }
     );
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {

     const message =
       (error.response && error.response.data && error.response.data.message) ||
       error.message ||
       error.toString();
     return thunkAPI.rejectWithValue(message);
    }
  });



export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({name,email},thunkAPI) => {
    //make a request
    try {
      
     const token = thunkAPI.getState().auth.user.token;
      const response = await fetch(
        `https://social-media-app-farz.onrender.com/api/users/update/profile`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: name, email: email }),
        }
      );

      const data = await response.json();
      // console.log("data after update",data);
      // console.log(token)
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
      // console.log(" error in updating the profile ",error);
    }
  }
);


export const updatePassword=createAsyncThunk('auth/updatePassword',async({oldPassword,newPassword},thunkAPI)=>{
  try {
    const token=thunkAPI.getState().auth.user.token;
    const response = await fetch(
      `https://social-media-app-farz.onrender.com/api/users/update/password`,
      {
        method: 'PUT',
        header: {
          'Content-Type': 'application/json',
          Authorization: `Bearer${token}`,
        },
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      }
    );
    const data=await response.json();
    // console.log(" data after change password",data);
  } catch (error) {

    const message=( error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message); 
  }
})








// logut user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});








// make slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // pending
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })

      // fulfilled
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })

      //rejected
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // case for logut
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // case for getting user

      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // .addCase(getAllPerson.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getAllPerson.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.user = action.payload;
      // })
      // .addCase(getAllPerson.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      // })
      // pending

      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })

      // fulfilled
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
      })

      //rejected
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.user = null;
      })



      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.user = null;
      });

  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
