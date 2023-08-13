
import React from 'react'
import { getPostsUser } from '../../api/apiPosts'
import { useState,useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    AiFillHeart,
    AiOutlineHeart,
    AiFillSetting,
    AiFillCloseCircle,
  } from "react-icons/ai";
  import { contextUser } from '../../Hooks/userContext'
  import { IconContext } from "react-icons";
  import { Link } from "react-router-dom";
  import { consultProfileProfessions } from '../../api/api'
  import { poststexts,dislikeTexts,likeTexts ,DeletePostsText,updateText,insertCommentText} from '../../api/apiPosts'

export const PostsTexts = () => {
  let contextPosts=useContext(contextUser)
    let navigate=useNavigate()
    const [posts, setPosts] = useState([]);
    const [settings, setSettings] = useState(false);
    const [changes,setChanges]=useState("not changes")
    const [boton,setBoton]=useState([])
    const [gestionText, setgestionText] = useState({
        id: "0",
        email: "",
      });
      const [infoUser,setInfoUser]=useState(null)
 
    useEffect(() => {
     
        async function loadInfoUserk() {
            const  result=await consultProfileProfessions(contextPosts.emailProfessions)
            setInfoUser(result.data[0])
            setChanges("change")
            if (infoUser!=null) {
              loadTexts()
            }
         
        }
        loadInfoUserk()
       
    }, [changes,boton]);
async function loadTexts(){
  
    if (infoUser!=null) {
      let response = await  poststexts(infoUser.email);
      console.log(response);
      setPosts(response.data.data1)
      let newArray=response.data.data1
      console.log(response.data);
      
      for(let i = 0; i < newArray.length;i++) {
        if (newArray[i].id==response.data.data2[i].id_textos) {
          newArray[i].estado=response.data.data2[i].estado
          
        }
  }
      setPosts(newArray)
 
    
    }else{
      console.log("not found");
      setChanges("cambios")
    }

    
}
    function postData(id, email) {
      document.getElementById("lolbel").click();
      let lista = { id: id, email: email };
      setgestionText(lista);
    }



    async function likeThis(id) {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].estado == "nomegusta" && posts[i].id == id) {
         
  
          const formdata = new FormData();
          formdata.append("id", id);
          const result = await likeTexts(formdata);
          console.log(result);
          setBoton(result)
        } else {
          console.log("ya dio like");
        }
      }
    }
    async function notLikeThis(id) {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].estado == "megusta" && posts[i].id == id) {
       
          const formdata = new FormData();
          formdata.append("id", id);
          const result = await dislikeTexts(formdata);
          console.log(result);
          setBoton(result)
        } else {
          console.log("ya dio dislike");
        }
      }
    }
    function alert() {
      document.getElementById("lolbel3").click();
    }
    function alertUpdate() {
        document.getElementById("lolbel4").click();
      }
      async function deletePostTexts() {
        let id = gestionText.id;
        console.log("Se esta eliminando...");
        const result = await DeletePostsText(id);
        console.log("se elimino", result);
        setBoton(result)
      }
      async function updatePostText() {
        let id = gestionText.id;
        let text = document.getElementById("newText").value;
        const formdata = new FormData();
        formdata.append("text", text);
        const result = await updateText(id, formdata);
        console.log("se elimino", result);
        setBoton(result)
        document.getElementById('closeOne').click
      }

      async  function commentText(id) {
        let comment=document.getElementById('coment').value
        const formdata=new FormData()
        formdata.append("coment",comment)
        const result=await insertCommentText(id,formdata)
        setChanges(result)
        document.getElementById('coment').value=null
      }
      
      function commentsUsers(params) {
        contextPosts.changeIdComment(params)
      if (contextPosts.idComment==params) {
        navigate("/CommentsTextUsers")
      }else{
    document.getElementById('comentar').click
      }
      }

  return (
    <>
   {posts.map((post)=>(
    <section className="post-contain" key={post.id}>
    <div data-aos="fade-up" data-aos-duration="500" className="post">
        <div className="post-info">
        <div className='post-info--c'>
            <div className="post-icon">
                  <img src={post.iconUser} alt="icon"/>
            </div>
              <div>
                <h2>{post.name}</h2>
                <p>{post.profession}</p>
              </div>
          </div>
          <div className="menu">
            {settings ? (
                    <span
                      onClick={() => {
                        postData(post.id, post.email, post.img);
                      }}
                    >
                        <div>
                          <i className='bx bxs-cog bx-sm' ></i>
                        </div>
                    </span>
                  ) : (
                    ""
                  )}
            </div>
        </div>
        <div className="post-img">
           <p>{post.textos}</p>
        </div>
        <div className="post-content">
          <div>
            <input type="text" placeholder="Escriba un comentario"  id='coment' />
            <p>
              <i class='bx bxs-send bx-sm' onClick={()=>{commentText(post.id)}}>
              </i>
            </p>
          </div>

            <h2>{post.name}</h2>
            <p>{post.description}</p>
        </div>
        <div className="post-stats">
            <div className="post-like">
              <p>
                   
                <span
                        onClick={() => {
                          likeThis(post.id);
                        }}
                        onDoubleClick={() => {
                          notLikeThis(post.id);
                        }}
                      > {post.estado == "megusta" ? (
                          
                            <div>
                              <div className="heart">
                                <i class='bx bxs-heart bx-sm bx-border-circle' ></i>
                                </div>
                            </div>
                        ) : (
                          
                              <div>
                                <div className="heart">
                                  <i className='bx bx-heart bx-sm bx-border-circle'></i>
                                </div>                            
                              </div>
                        )}</span>
                        {post.likes}
                        </p>
                      </div>
           
                      <div className="post-comment">
            <div className="post-like">
              <p>
                   
                <span
                       
                      > 
                          
                            <div>
                            <div className="message">
                           <i className='bx bxs-message-alt-dots bx-sm bx-border-circle' onClick={()=>commentsUsers(post.id) } id="comentar" ></i>  
                                </div>
                            </div>
                            
                        </span>
                        {post.comments}
                        </p>
                      </div>

            </div>
          
        </div>
    </div>
</section>

   ))}
 <div className="boton2-modal">
              <label htmlFor="btn2-modal" id="lolbel">
                Abrir Modal
              </label>
            </div>
            <input type="checkbox" id="btn2-modal" />
            <div className="container2-modal">
              <div className="content2-modal">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2>Gestionar Publicacion</h2>{" "}
                  <span>
                    <label htmlFor="btn2-modal">
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

                <p>Deseas eliminar o actualizar tu publicacion?</p>
                <div className="btn2-cerrar">
                  <label onClick={alertUpdate}> Actualizar </label>
                  <label style={{ marginLeft: "20px" }} onClick={alert}>
                    Eliminar
                  </label>
                </div>
              </div>
              <label htmlFor="btn2-modal" className="cerrar2-modal"></label>
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
                  <h2>Eliminar publicacion</h2>{" "}
                  <span>
                    <label htmlFor="btn3-modal">
                      <IconContext.Provider value={{ size: "30px" }}>
                        {" "}
                        <div>
                          {" "}
                          <AiFillCloseCircle />
                        </div>
                      </IconContext.Provider>
                    </label>
                  </span>
                </div>

                <p>Estas seguro de eliminar esta publicacion?</p>
                <div className="btn3-cerrar">
                  <label onClick={deletePostTexts}>Eliminar</label>
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
                  <label onClick={updatePostText}>Actualizar</label>
                </div>
              </div>
              <label htmlFor="btn4-modal" className="cerrar4-modal"></label>
            </div>








 </>
  )
}
