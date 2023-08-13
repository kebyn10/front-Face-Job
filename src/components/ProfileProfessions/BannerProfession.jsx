import React, { useState,useContext, useEffect } from 'react'
import icon from '../../assets/img/bear.jpg'
import follow from '../../assets/img/follow.png'
import like from '../../assets/img/like.png'
import send from '../../assets/img/send.png'
import post from '../../assets/img/post.png'
import { changeImgProfile } from '../../api/apiPosts'
import { contextUser } from '../../Hooks/userContext'
import { consultProfileProfessions } from '../../api/api'
import { Link,useNavigate } from 'react-router-dom'
import { createNewChat } from '../../api/apiChat'
import Swal from "sweetalert2"

export const Banner = () => {
  let navigate=useNavigate()
let contextPosts=useContext(contextUser)
const [infoUser,setInfoUser]=useState({iconUser:"",name:"",profession:""})
const [file, setFile] = useState(null);


useEffect(()=>{
   async function loadInfoUserk() {
   console.log(contextPosts.emailProfessions);
   
      let email=contextPosts.emailProfessions
    
      const  result=await consultProfileProfessions(email)
        setInfoUser({iconUser:result.data[0].iconUser,name:result.data[0].name,profession:result.data[0].profession})
        
      
    
   

        
        
    }
   loadInfoUserk()

},[])

function sendImage() {
    async function loadImage() {
      const formdata = new FormData();
      formdata.append("img", file);
      const res = await changeImgProfile(formdata);

      console.log(res);
      window.location.href = "/profile";
    }
    
loadImage()
    document.getElementById("file").value = null;
    setFile(null);
  }


const selectedHandler = (e) => {
    console.log("sii");
console.log(e.target.files[0]);
    if (!e.target.files[0]) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Debe seleccionar un archivo de imagen",
        showConfirmButton: false,
        timer: 1500,
        iconColor : "#064663",
        backdrop : "linear-gradient(#064663b6, #064663b6)",
        padding : "3em",
        color: "#064663",
        customClass : "border", 
      });
    } else {
      setFile(e.target.files[0]);
      document.getElementById("labelClick").click();
    }
  };
    const [ fix, setFix ] = useState(false)

    function setFixedBanner(){
        if (window.scrollY >=0){
            setFix(true)
        } else{
            setFix(false)
        }
    }

    window.addEventListener('scroll',setFixedBanner)
    const changesFor = (e) => {
        document.getElementById("file").click();
      };
      function postImages() {
        contextPosts.postImages() 
        
      }
      function postText() {
        contextPosts.postTexts() 
     
      }
     async function Chat() {
    
      let email=contextPosts.emailProfessions
        const response=await createNewChat(email)
        console.log(response.data);
        if (response.data=='connected') {
          navigate('/Chat')
        }else{
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Este usuario esta en proceso de revisión debido a comportamientos no adecuados",
            showConfirmButton: false,
            timer: 2500,
            iconColor : "#064663",
            backdrop : "linear-gradient(#064663b6, #064663b6)",
            padding : "3em",
            color: "#064663",
            customClass : "border", 
          });
        }
       }
  return (
    <section className={fix ? 'bnr fixed' : 'bnr'}>
        <div className="banner">
            <section>
                <div className="banner-icon" >
                    <img src={infoUser.iconUser} alt="icon"/>
                        
                </div>
                    <div className="banner-info">
                        <h2>{infoUser.name}</h2>
                        <p>{infoUser.profession}</p>
                    </div>  
                    <div className="banner-nav">
                        <nav>
                            <ul>
                                <li onClick={postImages}>Publicaciones</li>
                                <li onClick={postText}>Postales</li>
                                <li onClick={Chat}>Chat</li>
                            </ul>
                        </nav>
                    </div>              
            </section>
        </div>


        <input
                  type="file"
                  className="borton"
                  id="file"
                  onChange={selectedHandler}
                />

        <input type="checkbox" id="btn-modal" />
        <div className="boton-modal">
          <label htmlFor="btn-modal" id="labelClick">
            Abrir Modal
          </label>
        </div>
        <div className="container-modal">
          <div className="content-modal">
            <h2>¡Bienvenido!</h2>
            <p>
              Ten informamos que estas a punto de cambiar tu foto de perfil , la
              anterior sera eliminada y replazada por la seleccionada ¿estas
              seguro de cambiar?
            </p>
            <div className="btn-cerrar">
              <label htmlFor="btn-modal">Cerrar</label>
              <label onClick={sendImage} style={{ marginLeft: "20px" }}>
                aceptar
              </label>
            </div>
          </div>
          <label htmlFor="btn-modal" className="cerrar-modal"></label>
        </div>
    
    </section>
  )
}
