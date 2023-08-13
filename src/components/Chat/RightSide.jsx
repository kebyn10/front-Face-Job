import { sendMenssageUser,messagesPrivateUsers,dataUsuerChat,sendReport,workingUsers,delteChatComversations } from '../../api/apiChat'
import { loadInfoUser } from '../../api/api'
import { useState,useEffect } from 'react'
import { useContext } from 'react'
import { contextUser } from "../../Hooks/userContext"
import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillSetting,
  AiFillCloseCircle,
} from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function RightSide({text}) {
  const logo = "https://res.cloudinary.com/de2sdukuk/image/upload/v1681834064/Logo_st4un7.png"
  const context=useContext(contextUser)
    const soket=text.text
    let navigate=useNavigate()
    const [message,setMessage]=useState('')
    const [messagesPrivate,setMessagesPrivate]=useState([{'remitente':'Face-Job','tipo':'texto','mensaje':'selecciona un chat'}])
    const [changes,setChanges]=useState()
    const [infoUser,setInfoUser]=useState({})
    const [infoProfe,setInfoProfe]=useState({'lastname':'CHAT ','iconUser':logo,'name':'Face-job','profession':'face-Job'})
    const [file, setFile] = useState(null);
  useEffect(()=>{
    const resiveMessage=(message)=>{
  setChanges(message+Math.random)
    }
  
    soket.on('message',resiveMessage )
    return()=>{
      soket.off('message',resiveMessage)
      
    }
  },[])
  useEffect(()=>{

    async function loadMessages() {
      const reponse=await loadInfoUser();
      setInfoUser(reponse.data[0])
      
      if (context.paramUserChat!='' || context.paramUserChat!=undefined) {
         const response=await messagesPrivateUsers(context.paramUserChat)
         if (response.data.length>0) {
          setMessagesPrivate(response.data)
          const res=await dataUsuerChat(context.paramUserChat)
          setInfoProfe(res.data[0])
         }
      

      }
     
    
    }
   
    loadMessages()
    
  },[changes,context.paramUserChat])
  async function handleSubmit(e) {
    e.preventDefault()
    if (message==''|| message==undefined ) {
      alert('Debes escribir algo para poder ser enviado')
    }else{
      if (context.paramUserChat!='' || context.paramUserChat!=undefined) {
        if (!file) {
          
          soket.emit('message',message)
         
    const response=await sendMenssageUser({'message':message,'tipo':'texto'},context.paramUserChat)
    console.log(response.data);
    setMessage('')
    setChanges(response)
    context.changesMenssageUser(response)
        }else{
          if (message=='seleccionaste una imagen Face-Job') {
           
            const formdata = new FormData();
          formdata.append("img",file)
          formdata.append("tipo","img")
          formdata.append("message",message)
          setMessage('Por favor no escribas,espera a que se suba la imagen')
          const response=await sendMenssageUser(formdata,context.paramUserChat)
          setFile(null)
          document.getElementById('imageChat').value=null
          setChanges(response)
          soket.emit('message',message)
          setMessage('')
          context.changesMenssageUser(response)
          
          }
          
        }
        
      }
      
  
    }
  


  }
async function workingUser() {

  const response=await workingUsers(infoProfe.email)
  context.changesMenssageUser(response)
}
  function profileProfessionalChat() {
    context.chageEmailProfessions(infoProfe.email)
    if (context.emailProfessions!="null") {
      navigate('/ProfileProfessions')
    }else{
      if (context.emailProfessions!="null") {
        navigate('/ProfileProfessions')
      }
    }
  }
  
  function clickIcon() {
    document.getElementById('sendForm').click()
  }
 
 
  function deleteChat() {
    document.getElementById('lolbel').click()
  }
  function selectedImage() {
    document.getElementById('imageChat').click()
 
  }
  const selectedHandler = (e) => {
    setFile(e.target.files[0]);
    setMessage('seleccionaste una imagen Face-Job')
    
  };
  

  async function deleteChatCompleteUser() {
    document.getElementById('lolbel4').click()
  }

 async function deletereportsave(params) {
  let report= document.getElementById('newText').value
 if (report) {
  const formdata=new FormData();
  formdata.append('report',report)
  
      const resposes=await sendReport(infoProfe.email,formdata)
      if (resposes.data=="reportado") {
        const response=await delteChatComversations(infoProfe.email,{"report":params})
    window.location.href="/chat"
      }
 }else{
  alert('Escriba nuevamente el reporte')
 }
     
  }
async function deleteOnly(params) {
  if (params==0) {
    const response=await delteChatComversations(infoProfe.email,{"report":params})
    window.location.href="/chat"
  }
}

const styleChanges = () =>{
  if (context.styleLeft == "leftSide-chat") {
    context.setStyleLeftFun("leftSide-chat-responsive")
} else {
    context.setStyleLeftFun("leftSide-chat")
}
if (context.styleRight == "rightSide-chat") {
    context.setStyleRightFun("rightSide-chat-responsive")
} else {
    context.setStyleRightFun("rightSide-chat")
}
}

    return(
    <div className={context.styleRight}>
    <div className="header-chat-c">
        <div className="imgText-chat">
        <i class='bx bx-chevron-left-square' onClick={styleChanges} ></i>
            <div className="userImg-chat"  onClick={profileProfessionalChat}>
                <img src={infoProfe.iconUser} className="cover-chat"/>

            </div>
            <h4  onClick={profileProfessionalChat}>{infoProfe.name} {infoProfe.lastname} <br/> <span  onClick={profileProfessionalChat}>{infoProfe.profession}</span> </h4>
        </div>
        <ul>
            
        {infoProfe.name!="Face-job" ? ((<><li onClick={workingUser}><ion-icon name="bag-add-outline"></ion-icon><p>Trabajemos</p></li>
        <li onClick={deleteChat}><ion-icon name="trash-outline" ></ion-icon></li></>)) : "" }    
        
          
        </ul>
    </div>


    <div className="chatBox-chat">
    {messagesPrivate.map((messa,index)=>(
  
<div key={index}>
{messa.remitente==infoUser.email || messa.remitente=='Face-Job' ? ( <div className="message-chat my_message-chat" >
<p> {messa.tipo=="texto" ? messa.mensaje  : (<img src={messa.link} alt="" />)} <br/> <span>{messa.hora}</span> </p>
        </div>) : (<div className="message-chat client-chat" >
            <p> {messa.tipo=="texto" ? messa.mensaje  : (<img src={messa.link} alt="" />)} <br/> <span>{messa.hora}</span> </p>
        </div>) }
       
</div>


   
))}
 </div>

{infoProfe.name!="Face-job" ? (<form onSubmit={handleSubmit} className='form-chat'>
            <div className="chatbox_input-chat">
            <span onClick={selectedImage}> <ion-icon name="camera-outline"><input type="file" className='form-chat2' id='imageChat' onChange={selectedHandler}/></ion-icon></span>
                <input  autocomplete="off" id='menssagesSendForemojis' type="text" placeholder="Escribe un mensaje" onChange={e=> setMessage(e.target.value)} value={message}  />
                
          
               <ion-icon name="send-outline" onClick={clickIcon}><button type='submit' id='sendForm' className='button-chat'></button></ion-icon>  </div>
            
           </form> ) : (<form onSubmit={handleSubmit} className='form-chat'>
            <div className="chatbox_input-chat">
              <ion-icon name="camera-outline"></ion-icon>
                <input id='menssagesSendForemojis' type="text" placeholder="Escribe un mensaje" onChange={e=> setMessage(e.target.value)} value={message}  />
               <ion-icon name="send-outline" onClick={clickIcon}><button type='submit' id='sendForm' className='button-chat'></button> </ion-icon>  </div>

           </form> )}   



           <div className="boton2-modal">
            <label htmlFor="btn2-modal" id="lolbel">
              Abrir Modal
            </label>
          </div>
          <input type="checkbox" id="btn2-modal" />
          <div className="container2-modal">
            <div className="content2-modal">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Face-job Chat</h2>{" "}
                <span>
                  <label htmlFor="btn2-modal">
                  <ion-icon name="settings-outline"></ion-icon>
                  </label>
                </span>
              </div>

              <p>¿Deseas eliminar este chat ? <br /> ten en cuenta que hay dos opciones con una puedes reportar a un usuario y con la otra solo lo eliminas</p>
              <div className="btn2-cerrar">
               
              <label style={{background:" #d84c4c"}} onClick={deleteChatCompleteUser}> Reportar y eliminar</label>
                  <label style={{ marginLeft: "20px"}} onClick={()=>deleteOnly(0)} >
                    Eliminar
                  </label>
              </div>
            </div>
            <label htmlFor="btn2-modal" className="cerrar2-modal"></label>
          </div>
          
          <div className="boton4-modal">
              <label htmlFor="btn4-modal" id="lolbel4">
                Abrir Modal
              </label>
            </div>
            <input type="checkbox" id="btn4-modal" />
            <div className="container4-modal">
              <div className="content4-modal">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2>Proceso de Reporte</h2>{" "}
                  <span>
                    <label htmlFor="btn4-modal">
                      <IconContext.Provider value={{ size: "30px" }}>
                        {" "}
                        <div id='closeOne'>
                          {" "}
                          <AiFillCloseCircle />
                        </div>
                      </IconContext.Provider>
                    </label>
                  </span>
                </div>

                <textarea name="" id="newText" cols="40" rows="10"></textarea>
                <div className="btn4-cerrar">
                  <label onClick={()=>deletereportsave(1)}>Reportar</label>
                </div>
              </div>
              <label htmlFor="btn4-modal" className="cerrar4-modal"></label>
            </div>





    </div>)
    
}


export default RightSide