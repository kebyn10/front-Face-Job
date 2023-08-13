import { useEffect,useState } from "react";
import { loadInfoUser } from "../api/api"
import React from "react";
import io from 'socket.io-client'
export const contextUser =React.createContext({})


export default function ContextUserData({children}){
    const [loged,setLoget]=useState(false)
    const [infoUser,setInfoUser]=useState(null)
    const [imagesTexts,setImagesTexts]=useState(true)
    const [recoverPass,setRecoverPass]=useState("")
    const [emailProfessions,setEmailProfessions]=useState("null")
    const [idComment,setIdComment]=useState(null)
    const [paramUserChat,setparamUserChat]=useState('')
    const [changesMenssage,setChangesMenssage]=useState()
    const [styleLeft,setstyleLeft]=useState("leftSide-chat")
    const [styleRight,setstyleRight]=useState("rightSide-chat")

  useEffect(()=>{
    
    loadInfoUserPage()
    
  },[loged])

async function loadInfoUserPage() {
    const result=await loadInfoUser();
    
   if (!result.data[0].name) {
      setLoget(false)
      setInfoUser("notloged")
      console.log("no esta logeado");
 
     
    }else{
      setLoget(true)
      setInfoUser(result.data[0]);
      console.log("esta logeado");
    }
  }
function postImages() {
  setImagesTexts(true)
}
function postTexts() {
  setImagesTexts(false)
}
function changeEmail(newEmail) {
  setRecoverPass(newEmail)
}
function chageEmailProfessions(params) {
  setEmailProfessions(params)
}
function changeIdComment(params) {
  setIdComment(params)
}

function  changePramUserChat(params) {
  setparamUserChat(params)
}
function changesMenssageUser(params) {
  setChangesMenssage(params)
}

function setStyleLeftFun(style) {
  setstyleLeft(style)
}

function setStyleRightFun(style) {
  setstyleRight(style)
}


const soket=io('https://backend-face-job.onrender.com')
    return(
        <contextUser.Provider value={{soket,idComment,changeIdComment,emailProfessions,chageEmailProfessions,recoverPass,changeEmail,loged,setLoget,infoUser,setInfoUser,loadInfoUserPage,imagesTexts,postImages,postTexts,paramUserChat,changePramUserChat,changesMenssageUser,changesMenssage,setStyleLeftFun,styleLeft,setStyleRightFun,styleRight}}>
            {children}
        </contextUser.Provider>
    )
}