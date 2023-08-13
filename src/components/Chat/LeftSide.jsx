import { useEffect, useState,useContext } from "react"
import { newWorks } from '../../api/apiChat'
import CategoriesChats from "./CategoriesChats"
import { contextUser } from "../../Hooks/userContext"
import { Link } from "react-router-dom";
import { loadInfoUser } from "../../api/api";
import Cookie from "universal-cookie";


function LeftSide({text}) {
    const soket=text.text
    const cookie = new Cookie()
    


    const [styleComplete,setStyleComplete] = useState(localStorage.getItem("style-left") || "")
    const context=useContext(contextUser)
    const [chats,setChats]=useState([])
    const [changes,setChanges]=useState()
    const [idCategories,setIdCategories]=useState('nuevo')
    const[infoUser,setInfoUser]=useState({})
    
    const[chatsNotResults,setChatsNotResults]=useState(true)


    useEffect(()=>{
        setChanges("change"+Math.random())
    },[context.changesMenssage])
    useEffect(()=>{
        
        const resiveMessage=(message)=>{
            setChanges("changeMessage"+message+Math.random())
            context.changesMenssageUser("changeMessage"+message+Math.random())
            }
          
            soket.on('message',resiveMessage )
            return()=>{
              soket.off('message',resiveMessage)
              
            }
      },[])
    
    useEffect(()=>{
      
         async function loadChats() {
        const res=await newWorks(idCategories)
            if (res.data.length<=0) {
                setChatsNotResults(false)
            }else{
                
                setChats(res.data)
                setChatsNotResults(true)
            }
        
        const response=await loadInfoUser()
            setInfoUser(response.data[0])
      }
      loadChats()
    },[changes])
   
   async function categories(param) {
    if(param=='nuevos'){
        setIdCategories('nuevo')
        setChanges([{'name':'nuevo'}])
    }
    else if(param=='trabajando'){
         setIdCategories('trabajando')
        setChanges([{'name':'trabjando'}])
    }
   
    
   }
   function changeParamsChat(params) {
    context.changePramUserChat(params); 
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
    function searchNewsUser(params) {
    const palabraClave = params;
   const filterUser=chats

        if (params!='' || params!=undefined) {
            const names=[]
            for (let i = 0; i < chats.length; i++) {
                names.push(chats[i].name+" "+chats[i].lastname)
               
            }
            const palabrasConClave = chats.filter((palabra) =>
            palabra.namecomplete.toLowerCase().includes(palabraClave.toLowerCase()));
      
           setChats(palabrasConClave)
        }
        if (!params) {
        
            setChanges(filterUser)
        }
       
   }
console.log(context.styleLeft);

    return(
        <div className={context.styleLeft}>
       
        <div className="header-chat">
            <div className="userImg-chat">
               <Link to='/profile'><img src={infoUser.iconUser} alt="perfil Image" className="cover-chat"/></Link> 

            </div>
            <ul>

              <li> <Link to='/' className="LinkChat"><ionn-icon>FACE-JOB</ionn-icon></Link> </li>
                
            </ul>
        </div>
         
         <div className="search-chat">
                <input  autocomplete="off" type="text" placeholder="Busca clientes interesados"  onChange={e=> searchNewsUser(e.target.value)} />
         </div>
         
         <div className="escoger-chat">
            <div className={idCategories=='nuevo' ? "textosEscoger-chat" : "textosEscoger-chat2"} onClick={()=>categories('nuevos')} >Nuevos</div>
            <div className={idCategories=='trabajando' ? "textosEscoger-chat" : "textosEscoger-chat2"}  onClick={()=>categories('trabajando')}>
                <p>Trabajos</p>
                <ion-icon name="bag-add-outline"></ion-icon></div>
         </div>
         
         <div className="chatlist-chat">
          {chatsNotResults ? (chats.map((chat,index)=>(
          <div className="block-chat active-chat" onClick={()=>changeParamsChat(chat.email)} key={index}>
                <div className="imgbx-chat">
                    <img src={chat.iconUser}  />
                </div>
                <div className="details-chat">
                    <div className="listHead-chat">
                        <h4>{chat.name} {chat.lastname}</h4>
                        <p className="time">{chat.hora ? chat.hora : ""}</p>
                    </div>
                    <div className="message-p-chat">
                        <p>{chat.mensaje ? chat.mensaje : ""}</p>
                       {  /*cambie aqui*/  chat.remitente!=infoUser.email ? <b className="b-IconMessage"><i class='bx bxs-message-alt-add'></i></b> : "" }  
                    </div>
                </div>
            </div>) )) : "No hay chats aun"}  
        
           
         {/* <div className="block-chat active-chat ">
                <div className="imgbx-chat">
                    <img src="https://d500.epimg.net/cincodias/imagenes/2017/05/18/smartphones/1495098488_805979_1495098787_noticia_normal.jpg"  />
                </div>
                <div className="details-chat">
                    <div className="listHead-chat">
                        <h4>Kebyn julian ochoa perez</h4>
                        <p className="time">10:56</p>
                    </div>
                    <div className="message-p-chat">
                        <p>hola por ddddddddddddddddddddddddd favor me das los precios</p>
                        <b>1</b>
                    </div>
                </div>
            </div>*/}
            
            
     
         </div>
         
    </div>
    )
}

export default LeftSide