import React, { useState, useContext, useEffect } from 'react'
import { contextUser } from "../../Hooks/userContext";
// import logo from "../../assets/img/Logo.png";
import { Link, useNavigate  } from "react-router-dom";
import Cookies from 'universal-cookie'
import { IconContext } from "react-icons";
import { AiFillCloseCircle } from "react-icons/ai";



export const Sidebar = () => {
  let navigate=useNavigate()
  const cookies = new Cookies();
  let userContextInfo = useContext(contextUser)
  const [styleSide, setStyleSide] = useState("sidebar close")



  function openSide() {
    if (styleSide == "sidebar close") {
      setStyleSide("sidebar")
    }
    if (styleSide == "sidebar") {
      setStyleSide("sidebar close")
    }

  }
  function typePost() {
    document.getElementById("lolbel-post1").click();
  }

  function postImagesRedirect(){
    document.getElementById("lolbel-post1").click();
    if (styleSide == "sidebar") {
      setStyleSide("sidebar close")
    }
  setTimeout(() => {
    navigate('/createPostImage')
  }, 400);  
 }

 function postTextRedirect(){
  document.getElementById("lolbel-post1").click();
  if (styleSide == "sidebar") {
    setStyleSide("sidebar close")
  }
  setTimeout(() => {
    navigate('/createPostText')
  }, 400);  
  
}

  const closeSesion = () => {
    cookies.remove('token', { path: "/" })
    window.location.href = "/"
  }

  const catalogue = () =>{
    navigate('/catalogue')
  }
  const post = () =>{
    navigate('/posts')
  }
  const claims = () =>{
    navigate('/claims')
  }
  const pack = () =>{
    navigate('/paquetes')
  }
  const chat = () =>{
    navigate('/chat')
  }
  const profile = () =>{
    navigate('/profile')
  }
  const profileText = () =>{
    navigate('/profileText')
  }
  const ajustes = () =>{
    navigate('/ajustes')
  }
  return (
    <>
      <div className={styleSide}>
        <ul className="nav-links">
        {userContextInfo.loged ?
            <div className="profile-details">
              <div className="name-job">
              <ul>
                <li><Link to="/profile" className="link_name"><img src={userContextInfo.infoUser.iconUser} alt="imagen de usuario" /></Link></li>
              </ul>
                <Link onClick={openSide} to="/profile" className="profile_name">{userContextInfo.infoUser.name}</Link>
              </div>
              <i className='bx bx-log-out' onClick={closeSesion}></i>
            </div>
            
             :
            <div className="profile-details">
              <ul>
                <li><Link to="/login" className="link_name"><img src="https://res.cloudinary.com/de2sdukuk/image/upload/v1682083366/usericon_eqm409.jpg" alt="icono por defecto" /></Link></li>
              </ul>
              <div className="name-job">
                <Link onClick={openSide} to="/login" className="profile_name">Iniciar sesión</Link>
              </div>
            </div>}
          <li>
            <a>
              <i className='bx bx-user-pin' onClick={catalogue} ></i>
              <Link onClick={openSide} to="/catalogue" className="link_name">Perfiles</Link>
            </a>
            <ul className="sub-menu blank">
              <li><Link to="/catalogue" className="link_name">Perfiles</Link></li>
            </ul>
          </li>
          <li>
            <a>
              <i className='bx bx-carousel' onClick={post} ></i>
              <Link onClick={openSide} to="/posts" className="link_name">Publicaciones</Link>
            </a>
            <ul className="sub-menu">
              <li><Link to="/posts" className="link_name">Publicaciones</Link></li>
            </ul>
          </li>
          <li>
            <a>
              <i className='bx bx-help-circle' onClick={claims}></i>
              <Link onClick={openSide} to="/claims" className="link_name">Sobre nosotros</Link>
            </a>
            <ul className="sub-menu">
              <li><Link to="/claims" className="link_name">Sobre nosotros</Link></li>
            </ul>
          </li>
          <li>
            <a>
              <i className='bx bx-purchase-tag-alt' onClick={pack}></i>
              <Link onClick={openSide} to="/paquetes" className="link_name">Paquetes</Link>
            </a>
            <ul className="sub-menu blank">
              <li><Link to="/paquetes" className="link_name">Paquetes</Link></li>
            </ul>
          </li>
          {userContextInfo.loged ? <>
            <li>
              <a>
                <i className='bx bx-chat' onClick={chat}></i>
                <Link onClick={openSide} to="/chat" className="link_name">Chat</Link>
              </a>
              <ul className="sub-menu blank">
                <li><Link to="/chat" className="link_name">Chat</Link></li>
              </ul>
            </li>
            <li>
              <a>
                <i className='bx bx-camera' onClick={profile}></i>
                <Link onClick={openSide} to="/profile" className="link_name">Mis Publicaciones</Link>
              </a>
              <ul className="sub-menu">
                <li><Link to="/profile" className="link_name">Mis Publicaciones</Link></li>
              </ul>
            </li>
            <li>
              <a>
                <i className='bx bx-note' onClick={profileText}></i>
                <Link onClick={openSide} to="/profileText" className="link_name">Mis Postales</Link>
              </a>
              <ul className="sub-menu blank">
                <li><Link to="/profileText" className="link_name">Mis Postales</Link></li>
              </ul>
            </li>
            <li>
              <a>
                <i className='bx bx-folder-plus' onClick={()=>{typePost()}}></i>
                <span className="link_name" onClick={()=>{typePost()}}>Publicar</span>
              </a>
              <ul className="sub-menu blank">
                <li><a className="link_name" onClick={()=>{typePost()}}>Publicar</a></li>
              </ul>
            </li>
            <li>
              <a>
                <i className='bx bx-cog' onClick={ajustes}></i>
                <Link to="/ajustes" className="link_name">Ajustes</Link>
              </a>
              <ul className="sub-menu blank">
                <li><Link to="/ajustes" className="link_name">Ajustes</Link></li>
              </ul>
            </li>
          </> : <></>}
        </ul>
        <div className="logo-details">
          <i className='bx bx-menu' onClick={openSide}></i>
          <Link to="/" className="logo_name" onClick={openSide}>Face-Job</Link>
        </div>
      </div>

       <div className="boton7-modal">
    <label htmlFor="btn7-modal" id="lolbel-post1">
      Abrir Modal
    </label>
  </div>
  <input type="checkbox" id="btn7-modal" />
  <div className="container7-modal">
    <div className="content7-modal">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Tipo de publicación</h2>{" "}
        <span>
          <label htmlFor="btn7-modal">
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

      <p>Que tipo de publicación desea realizar?</p>
      <div className="btn7-cerrar">
       
        <label style={{marginRight:"10px"}} onClick={postImagesRedirect}>
          Imagen
        </label>
        <label  onClick={postTextRedirect}>
          Texto
        </label>
      </div>
    </div>
    <label htmlFor="btn7-modal" className="cerrar7-modal"></label>
  </div> 
    </>

  )
}
