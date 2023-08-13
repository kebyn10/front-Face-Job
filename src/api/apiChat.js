import axios from "axios";
import Cookie from "universal-cookie";

// let url = "http://localhost:4000"
let url = "https://backend-face-job.onrender.com"
const cookie = new Cookie();
let token = cookie.get('token')

export const sendMenssageUser= async (message,param) =>
  await axios.post(`${url}/sendMenssage/${param}`,message,{
    headers: {
      token: token,
    },
  })


export const messagesPrivateUsers=async(param)=>
await axios.get(`${url}/messagesPrivate/${param}`,{
  headers: {
    token: token,
  },
})


export const newWorks=async(param)=>
await axios.get(`${url}/newWorks/${param}`,{
  headers: {
    token: token,
  },
})

export const dataUsuerChat=async(param)=>
await axios.get(`${url}/dataUsuerChat/${param}`)



export const workingUsers=async(param)=>
await axios.get(`${url}/workingUsers/${param}`,{
  headers: {
    token: token,
  },
})

export const delteChatComversations=async(param,report)=>
await axios.post(`${url}/delteChatComversations/${param}`,report,{
  headers:{
    token:token,
  },
})

export const createNewChat=async(param)=>
await axios.get(`${url}/createNewChat/${param}`,{
  headers:{
    token:token,
  },
})

export const sendReport=async(param,report)=>
await axios.post(`${url}/sendReport/${param}`,report,{
  headers:{
    token:token,
  },
})