import axios from 'axios';
export const addCommentOnPost=(id,comment)=>async(dispatch)=>{
try {
 dispatch({
  type:'addCommentPending',
 });
 const{data}=await axios.put(`/api/posts/comment/${id}`,
 {
  comment,
 },
 {
  headers:{
   "content-Type":'application/json',
  },
 });
 dispatch({
  type:'addCommentSuccess',
  payload:data.message,
 })
} catch (error) {
    dispatch({
      type: 'addCommentFailure',
      payload: error.response.data.message,
    });
}
}