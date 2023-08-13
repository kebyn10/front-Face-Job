import { useEffect, useState } from "react"
import { loadInfoUser } from "../../api/api"
import { insertComment,getCommentsUsers,updateComments,deleteComments } from "../../api/apiPosts"
import { contextUser } from "../../Hooks/userContext"
import {AiFillCloseCircle} from "react-icons/ai";
import { IconContext } from "react-icons";
import { useContext } from "react"
import { Sidebar } from "../Header/Sidebar";


export  const Comments=()=>{
    let context=useContext(contextUser)
   const [infoUserC,setInfoUserC]=useState({iconUser:""})
   const [comments,setComments]=useState([])
   const [changes,setChanges]=useState("")
   const [infoComment,setInfoComments]=useState(0)
   

   useEffect(()=>{
        async function loadInfo() {
            const result=await loadInfoUser()
            setInfoUserC(result.data[0])
          
            loadComments()
           
        }
        loadInfo()
   },[changes])

async function loadComments(){
if (infoUserC!=null ) {
    const result=await getCommentsUsers(context.idComment)
    setComments(result.data)
    setChanges("cambiox")
   

    
}
}


async function sendComment() {
    let commentUser=document.getElementById('nuevoComentario').value
    if (context.idComment!=null && commentUser!=undefined && commentUser!='') {
       const formdata=new FormData();
       formdata.append("coment",commentUser)
       const result=await insertComment(context.idComment,formdata)
       console.log(result);
       setChanges("cambio")
       document.getElementById('nuevoComentario').value=null
    }else{
        console.log("no hay publicacion");
    }
}
function openModal(id) {
   setInfoComments(id)
   
  let res= document.getElementById('lolbel5').click()
  console.log(res);
    console.log('hola');
}
function alert() {
    document.getElementById('lolbel3').click()
    console.log(infoComment," eliminanda");
    
}
async function deleteComment() {
  if (infoComment!=0) {
    const formdata=new FormData();
    formdata.append('param',context.idComment)
   const result=await deleteComments(infoComment,formdata)
    console.log(result);
    document.getElementById('closetwo').click()
    document.getElementById('closeOne').click()
    setChanges("camb")
  }else{
    console.log('hubo un error');
  }
  
}
function alertUpdate() {
    document.getElementById('lolbel4').click()
}
async function updateComment() {
 let newText= document.getElementById('newText').value

 if (infoComment!=0) {
  const formdata=new FormData();
  formdata.append('comment',newText)
   let result=await updateComments(infoComment,formdata)
    console.log(result);
    document.getElementById('newText').value=null
    document.getElementById('closeT').click()
    document.getElementById('closeOne').click()
    setChanges("camb")
 }else{
  console.log("hubo un error");
 }
   
    
}


    return(
      <>
      <Sidebar/>
        <div>
            <div className="contanerCommentsComponent">
                  <div className="contenedorsec">
                      <div className="imagen-usuario">
                        <img src={infoUserC.iconUser} alt="" className="imgcomment"/>
                      </div>
                      <div className="input-com">
                        <input id="nuevoComentario" type="text" placeholder="Nuevo comentario..." />
                      <div className="boton-com">
                          <button className="buttonComments" onClick={sendComment}>Comentar</button>
                      </div>
                    </div>
                </div>
 
    <div className="boton5-modal">
              <label htmlFor="btn5-modal" id="lolbel5">
                Abrir Modal
              </label>
            </div>
            <input type="checkbox" id="btn5-modal" />
            <div className="container5-modal">
              <div className="content5-modal">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2>Gestionar Comentarios</h2>{" "}
                  <span>
                    <label htmlFor="btn5-modal">
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

                <p>Deseas eliminar o actualizar tu Comentario?</p>
                <div className="btn5-cerrar" style={{marginTop:"10px"}}>
                  <label onClick={alertUpdate}> Actualizar </label>
                  <label style={{ marginLeft: "20px" }} onClick={alert}>
                    Eliminar
                  </label>
                </div>
              </div>
              <label htmlFor="btn5-modal" className="cerrar5-modal"></label>
            </div>


   
   {comments.map((com)=>(
   <ul id="cometarios" class="conenedor-2" key={com.id}>
        <section class="contenedorsec" >
       {com.emailcliente==infoUserC.email ? <div>
        </div> : <div>   </div>}  
        <div class="comments"><div class="imagen-usuario" >
            
           
            <img src={com.iconUser} alt="" className="imgcomment" />
            </div>    
                <p class="commentText"><h2>{com.name} <br /> </h2>{com.comentario}</p>
            <i className='bx bxs-cog bx-sm' onClick={()=>openModal(com.id)}></i>

            </div>
            
            </section>
    </ul>
   ))}
   
   
</div>

 


<div className="boton3-modal">
              <label htmlFor="btn3-modal" id="lolbel3">
                Abrir Modal
              </label>
            </div>
            <input type="checkbox" id="btn3-modal" />
            <div className="container3-modal">
              <div className="content3-modal">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2>Eliminar Comentario</h2>{" "}
                  <span>
                    <label htmlFor="btn3-modal">
                      <IconContext.Provider value={{ size: "30px" }}>
                        {" "}
                        <div id='closetwo'>
                          {" "}
                          <AiFillCloseCircle />
                        </div>
                      </IconContext.Provider>
                    </label>
                  </span>
                </div>

                <p>Estas seguro de eliminar este Comentario?</p>
                <div className="btn3-cerrar">
                  <label onClick={deleteComment}>Eliminar</label>
                </div>
              </div>
              <label htmlFor="btn3-modal" className="cerrar3-modal"></label>
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
                  <h2>Proceso de actualizacion</h2>{" "}
                  <span>
                    <label htmlFor="btn4-modal">
                      <IconContext.Provider value={{ size: "30px" }}>
                        {" "}
                        <div id='closeT'>
                          {" "}
                          <AiFillCloseCircle />
                        </div>
                      </IconContext.Provider>
                    </label>
                  </span>
                </div>

                <textarea name="" id="newText" cols="40" rows="10"></textarea>
                <div className="btn4-cerrar">
                  <label onClick={updateComment}>Actualizar</label>
                </div>
              </div>
              <label htmlFor="btn4-modal" className="cerrar4-modal"></label>
            </div>

</div>  
</> 
    )
}