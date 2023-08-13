import React from 'react'
import { getPostsUser } from '../../api/apiPosts'
import { useState,useEffect,useContext } from 'react'
import { contextUser } from '../../Hooks/userContext'
import {
    AiFillHeart,
    AiOutlineHeart,
    AiFillSetting,
    AiFillCloseCircle,
  } from "react-icons/ai";
  import { IconContext } from "react-icons";
  import { Link } from "react-router-dom";
  import { consultProfileProfessions } from '../../api/api'
  import { like,dislike,DeletePostImage,insertComment } from '../../api/apiPosts'
  import { useNavigate } from 'react-router-dom';
export const Post = () => {
  let contextPosts=useContext(contextUser)
    const [posts, setPosts] = useState([]);
    const [settings, setSettings] = useState(false);
    const [changes,setChanges]=useState("not changes")
    const [boton,setBoton]=useState([])
    const [gestionImg, setGestionImg] = useState({
        id: "0",
        email: "",
        img: "",
      });
      const [infoUser,setInfoUser]=useState(null)
 
    useEffect(() => {
     
    
        async function loadInfoUserk() {
          const  result=await consultProfileProfessions(contextPosts.emailProfessions)
          setInfoUser(result.data[0])
        

          setChanges("change")
          if (infoUser!=null) {
            loadImages()
          }
       
      }
      loadInfoUserk()
     
        
       
    }, [changes,boton]);
async function loadImages(){
  
    if (infoUser!=null) {
      let response = await  getPostsUser(infoUser.email);
     setPosts(response.data.data1)
      let newArray=response.data.data1
   
 
  for(let i = 0; i < newArray.length;i++) {
        if (newArray[i].id==response.data.data2[i].id_megusta) {
          newArray[i].estado=response.data.data2[i].estado
          
        }
  }
   setPosts(newArray)
    
    }else{
      console.log("not found");
      setChanges("cambios")
    }

    
}
    function postData(id, email, img) {
      document.getElementById("lolbel").click();
      let lista = { id: id, email: email, img: img };
      setGestionImg(lista);
    }



    async function likeThis(id) {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].estado == "nomegusta" && posts[i].id == id) {
         
  
          const formdata = new FormData();
          formdata.append("id", id);
          const result = await like(formdata);
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
          const result = await dislike(formdata);
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
    async function deletePost() {
      let id = gestionImg.id;
      console.log("Se esta eliminando...");
      const result = await DeletePostImage(id);
      console.log("se elimino", result);
      window.location.href = "/profile";
    }
    async  function comment(id) {
      let comment=document.getElementById('coment').value
      const formdata=new FormData()
      formdata.append("coment",comment)
      const result=await insertComment(id,formdata)
      setChanges(result)
      document.getElementById('coment').value=null
    }
    let navigate=useNavigate()
    function commentsUsers(params) {
      contextPosts.changeIdComment(params)
    if (contextPosts.idComment==params) {
      navigate("/CommentsUsers")
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
           
            </div>
        </div>
        <div className="post-img">
            <img src={post.img} alt="" />
        </div>
        <div className="post-content">
          <div>
            <input type="text" placeholder="Escriba un comentario"  id='coment' />
            <p>
              <i className='bx bxs-send bx-sm' onClick={()=>{comment(post.id)}}>
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
                                <i className='bx bxs-heart bx-sm bx-border-circle' ></i>
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
                   
                <span> 
                          
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Gestionar Publicacion</h2>{" "}
                <span>
                  <label htmlFor="btn2-modal">
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

              <p>Deseas eliminar  tu publicacion?</p>
              <div className="btn2-cerrar">
               
                <label  onClick={alert}>
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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

              <p>
                Estas seguro de eliminar esta publicacion?
                <img src={gestionImg.img} alt="imagen" />
              </p>
              <div className="btn3-cerrar">
                <label onClick={deletePost}>Eliminar</label>
              </div>
            </div>
            <label htmlFor="btn3-modal" className="cerrar3-modal"></label>
          </div>
    

 </>
  )
}
