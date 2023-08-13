import axios from "axios";
import Cookie from "universal-cookie";

// let url = "http://localhost:4000"
let url = "https://backend-face-job.onrender.com"
const cookie = new Cookie();
let token = cookie.get('token')

export const createPostImage= async (param,data) =>
  await axios.post(`${url}/user/createpost/${param}`, data);

  export const getPostsUser= async (param) =>
  await axios.get(`${url}/user/postsimagenes/${param}`,{
    headers: {
      token: token,
    },
  })

  export const changeImgProfile = async (formdata) =>
  await axios.put(`${url}/user/Image`, formdata, {
    headers: {
      token: token,
    },
  })

  export const like = async (id) =>
  await axios.post(`${url}/user/usermegusta/`,id,{
    headers: {
      token: token,
    },
  })
export const dislike = async (id) =>
  await axios.post(`${url}/user/usernomegusta`, id,{
    headers: {
      token: token,
    },
  })

  export const DeletePostImage = async (para) =>
  await axios.delete(`${url}/user/userEliminaPost/${para}`);


  /* texts consumos*/
  export const poststexts = async (para) =>
  await axios.get(`${url}/user/userPoststextos/${para}`,{
  headers: {
    token: token,
  },
})

  export const createPostText = async (param, data) =>
  await axios.post(`${url}/user/createposttext/${param}`, data);


  export const likeTexts = async (id) =>
  await axios.post(`${url}/user/usermegustatext/`,id,{
    headers: {
      token: token,
    },
  })

export const dislikeTexts = async (id) =>
await axios.post(`${url}/user/usernomegustatext/`,id,{
  headers: {
    token: token,
  },
})

export const DeletePostsText = async (para) =>
await axios.delete(`${url}/user/userEliminaPostText/${para}`);

export const updateText = async (para, text) =>
await axios.put(`${url}/user/userUpdatePostText/${para}`, text);
 

/* comentarios*/
export const insertComment = async (id,commet) =>
await axios.post(`${url}/user/insertComment/${id}`,commet,{
  headers: {
    token: token,
  },
})

export const getCommentsUsers=async(id)=>
await axios.get(`${url}/user/getComments/${id}`)


export const updateComments=async(id,comment)=>
await axios.put(`${url}/user/updateComments/${id}`,comment)

export const deleteComments=async(id,param)=>
await axios.put(`${url}/user/deleteComments/${id}`,param)


export const insertCommentText = async (id,commet) =>
await axios.post(`${url}/user/insertCommentText/${id}`,commet,{
  headers: {
    token: token,
  },
})

export const getCommentsUsersText=async(id)=>
await axios.get(`${url}/user/getCommentsText/${id}`)

export const deleteCommentsText=async(id,param)=>
await axios.put(`${url}/user/deleteCommentsText/${id}`,param)
