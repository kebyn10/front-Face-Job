import React, { useState,useContext, useEffect } from 'react'
import { changeImgProfile } from '../../api/apiPosts'
import { contextUser } from '../../Hooks/userContext'
import { loadInfoUser } from '../../api/api'
import { Link } from 'react-router-dom'
import { IconContext } from "react-icons";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export const Banner = () => {
  let navigate=useNavigate()
let contextPosts=useContext(contextUser)
const [infoAge, setInfoAge] = useState([]);
const [infoUser,setInfoUser]=useState([])
const [file, setFile] = useState(null);

useEffect(()=>{
   async function loadInfoUserk() {
        const  result=await loadInfoUser()
        setInfoUser(result.data[0])
     
        console.log(result.data[0]);
    }
   loadInfoUserk()

},[])

useEffect(() => {
  async function loadInfoUserSettings() {
    const result = await loadInfoUser();
    let age=""
    for (let i = 0; i < 10; i++) {
    age = age+result.data[0].age[i]; 
    }
    setInfoAge(age);
  }
  loadInfoUserSettings();
}, []);

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
        title: "Debes seleccionar un archivo de imagen",
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
        console.log(contextPosts.imagesTexts);
      }
      function postText() {
        contextPosts.postTexts() 
        console.log(contextPosts.imagesTexts);
      }

      function typePost() {
        document.getElementById("lolbel-post").click();
      }
     function postImagesRedirect(){
        navigate('/createPostImage')
        
     }

     function postTextRedirect(){
      navigate('/createPostText')
      
   }
   function Chat() {
    navigate('/Chat')
   }

  return (
  
    <section className={fix ? 'bnr fixed' : 'bnr'}>
        <div className="banner">
            <section>
                <div className="banner-icon" onClick={changesFor}>
                    <img src={infoUser.iconUser} alt="icon"/>
                    <div className='banner-icon-cape' >Cambiar icono</div>
                </div>
                    <div className="banner-info">
                        <h2>{infoUser.name}</h2>
                        <p>{infoUser.profession}</p>
                    </div>  
                    <div className="banner-nav">
                        <nav>
                            <ul>
                              <li><span>Nombre Completo:</span> {infoUser.namecomplete}</li>
                              <li><span>Email:</span> {infoUser.email}</li>
                              <li><span>Fecha Nacimiento:</span> {infoAge}</li>
                              <li><span>Numero:</span> {infoUser.number}</li>
                              <li><span>Paquete:</span> {infoUser.cod_paquete}</li>
                              <li><span>Vistas Disponibles:</span> {infoUser.info_paquete}</li>
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
    <div className="boton6-modal">
    <label htmlFor="btn6-modal" id="lolbel-post">
      Abrir Modal
    </label>
  </div>
  <input type="checkbox" id="btn6-modal" />
  <div className="container6-modal">
    <div className="content6-modal">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Tipo de publicación</h2>{" "}
        <span>
          <label htmlFor="btn6-modal">
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
      <div className="btn6-cerrar">
       
        <label style={{marginRight:"10px"}} onClick={postImagesRedirect}>
          Imagen
        </label>
        <label  onClick={postTextRedirect}>
          Texto
        </label>
      </div>
    </div>
    <label htmlFor="btn6-modal" className="cerrar6-modal"></label>
  </div>
    </section>
  
  
  )
}
