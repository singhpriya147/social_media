import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService'

const initialState={
 posts:[],
 isError:false,
 isSuccess:false,
 isLoading:false,

}

// create new post
 
export const createPost=createAsyncThunk('posts/create',async(postData,thunkAPI)=>{

 try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.createPost(postData, token)
      
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
        }
})

// Get user Feed posts basically all following user post 

export const getUserFeed = createAsyncThunk(
  'posts/getUserFeed',
  async (_,thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.getUserFeed(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
);








// Get post of  one user

export const getUserPosts = createAsyncThunk(
  'posts/getOnlyUserPosts',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.getUserPosts(id,token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



// cooment on post 

// export const addComment = createAsyncThunk(
//   'posts/addComment',
//   async (id,value, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;


//       return await postService.addComment(id,value,token);
     
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );


export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({id, value}, thunkAPI) => {
    // console.log(id);
    // console.log(value);
    try {
      const token = thunkAPI.getState().auth.user.token;

      const response = await fetch(`https://social-media-app-farz.onrender.com/api/posts/comment/${id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`}
      ,
        body:JSON.stringify({comment:value})}
      );
       
 const data = await response.json(); // Await
//  console.log(data);
 return data;

    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const deleteComment = createAsyncThunk(
  'posts/deleteComment',
  async ( {id, commentId},thunkAPI) => {
    // console.log(id);
    // console.log(value);
    try {
      const token = thunkAPI.getState().auth.user.token;

      const response = await fetch(
        `https://social-media-app-farz.onrender.com/api/posts/comment/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({commentId:commentId}),
        }
      );

      const data = await response.json(); // Await 
      // console.log(data);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);











// Delete user post
export const deletePost = createAsyncThunk(
  'post/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.deletePost(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
);


// edit user post
export const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ id, value }, thunkAPI) => {
    // console.log(id);
    // console.log(value);
    try {
      const token = thunkAPI.getState().auth.user.token;

      const response = await fetch(
        `https://social-media-app-farz.onrender.com/api/posts/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: value }),
        }
      );

      const data = await response.json(); // Await
      // console.log(data);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getUserFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getUserFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })


      
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
         state.posts.comment = action.payload.comment;
       
      })

      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })




      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

       const{id,commentId}=action.payload;
      
           state.posts = state.posts.map((post) => {
             if (post._id === id) {
               post.comments = post.comments.filter(
                 (comment) => comment._id !== commentId
               );
             }
             return post;
           });
        

          
           
         
             
           })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })





      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })


      .addCase(editPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.title=action.payload.title;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export  const {reset}=postSlice.actions
export default postSlice.reducer;
