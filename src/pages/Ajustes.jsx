import React, { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { loadInfoUser } from "../api/api";
import { getPostsUser,poststexts,DeletePostImage,DeletePostsText } from "../api/apiPosts";
import { Sidebar } from "../components/Header/Sidebar";
import { contextUser } from "../Hooks/userContext";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import Swal from "sweetalert2";

export const Ajustes = () => {
  const userContext = useContext(contextUser)
  const [infoUser, setInfoUser] = useState([]);
  const [infoAge, setInfoAge] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postsText, setPostsText] = useState([]);
  const [boton,setBoton]=useState([])
  const [gestionImg, setGestionImg] = useState({
    id: "0",
    email: "",
    img: "",
  });
  const [gestionText, setgestionText] = useState({
    id: "0",
    email: "",
  });

  useEffect(() => {
    async function loadInfoUserSettings() {
      const result = await loadInfoUser();
      setInfoUser(result.data[0]);
      loadImage()
    }
    loadInfoUserSettings();
  }, []);

  async function loadImage() {
    const resp = await getPostsUser(userContext.infoUser.email)
    const resp1 = await poststexts(userContext.infoUser.email)
    setPosts(resp.data)
    setPostsText(resp1.data)
  }

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

    function postData(id, email, img) {
      document.getElementById("lolbel").click();
      let lista = { id: id, email: email, img: img };
      setGestionImg(lista);
    }

    function postDataText(id, email) {
      document.getElementById("lolbel-text").click();  
      let lista = { id: id, email: email };
      setgestionText(lista);
    }

    function alert() {
      document.getElementById("lolbel").click();
    }

    function alertText() {
      document.getElementById("lolbelEliminarText").click();
    }

    async function deletePostTexts() {
      let id = gestionText.id;
      console.log("Se esta eliminando...");
      const result = await DeletePostsText(id);
      console.log("se elimino", result);
      setBoton(result)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Se elimino la publicación",
        showConfirmButton: false,
        timer: 1500,
        iconColor : "#064663",
        backdrop : "linear-gradient(#064663b6, #064663b6)",
        padding : "3em",
        color: "#064663",
        customClass : "border", 
      });
      setTimeout(()=>{
        window.location.href="/Ajustes"
      },1500)
    }

    async function deletePost() {
      let id = gestionImg.id;
      console.log("Se esta eliminando...");
      const result = await DeletePostImage(id);
      console.log("se elimino", result);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Se elimino la publicación",
        showConfirmButton: false,
        timer: 1500,
        iconColor : "#064663",
        backdrop : "linear-gradient(#064663b6, #064663b6)",
        padding : "3em",
        color: "#064663",
        customClass : "border",
      }); 
      setTimeout(()=>{
        window.location.href="/Ajustes"
      },1500)
    }

  return (
    <>
    <Sidebar/>
      <section className="ajustes-section">
        <div className="bnr">
            <div className="banner">
                <div className="banner-icon">
                    <img src={infoUser.iconUser} alt="icon" />
                    <div className='banner-icon-cape' >Cambiar icono</div>
                </div>
          <div className="banner-nav">
            <nav>
              <ul>
                <li><span>Nombre Completo:</span> {infoUser.namecomplete}</li>
                <li><span>Email:</span> {infoUser.email}</li>
                <li><span>Fecha Nacimiento:</span> {infoAge}</li>
                <li><span>Número:</span> {infoUser.number}</li>
                <li><span>Paquete:</span> {infoUser.cod_paquete}</li>
                <li><span>Vistas Disponibles:</span> {infoUser.info_paquete}</li>     
              </ul>
            </nav>
          </div>
            </div>
        </div>
        <div className="container-infoUser">
          <section className="container-infoUser-options">
            <Link to="/UpdateForm"><p>Actualizar información</p></Link>  
            <Link to="/DeleteForm"><p >Eliminar cuenta</p></Link>
          </section>
          <div className="description">
            <p>Contenido</p>
            <p>Descripción</p>
            <p>Me gustas</p>
            <p>Comentarios</p>
            <p>Eliminar</p>
           </div>
          <section className="container-infoUser-posts">
            {posts.map((post)=>(  
              <div key={post.id}>
                <img src={post.img} alt="hola" />
                <p>{post.description}</p>
                <p>{post.likes}</p>
                <p>{post.comments}</p>
                <p><i class='bx bx-trash' onClick={()=>{ postData(post.id, post.email, post.img)}}></i></p>
              </div>
            ))}
            
            {postsText.map((post)=>(
              <div key={post.id}>
                <p>{post.textos}</p>
                <p>{post.description}</p>
                <p>{post.likes}</p>
                <p>{post.comments}</p>
                <p><i class='bx bx-trash' onClick={()=>{ postDataText(post.id, post.email, post.img)}}></i></p>
              </div>
            ))}
          </section>
        </div>
      </section>  
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

              <p>Deseas eliminar  tu publicación?</p>
              <div className="btn2-cerrar">
               
                <label  onClick={deletePost}>
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
                Estas seguro de eliminar esta publicación?
                <img src={gestionImg.img} alt="imagen" />
              </p>
              <div className="btn3-cerrar">
                <label onClick={deletePost}>Eliminar</label>
              </div>
            </div>
            <label htmlFor="btn3-modal" className="cerrar3-modal"></label>
          </div>
          

          <div className="boton4-modal">
              <label htmlFor="btn4-modal" id="lolbel-text">
                Abrir Modal
              </label>
            </div>
            <input type="checkbox" id="btn4-modal" />
            <div className="container4-modal">
              <div className="content4-modal">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2>Gestionar Publicacion</h2>{" "}
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

                <p>Deseas eliminar o actualizar tu publicación?</p>
                <div className="btn4-cerrar">
                  <label style={{ marginLeft: "20px" }} onClick={alertText}>
                    Eliminar
                  </label>
                </div>
              </div>
              <label htmlFor="btn4-modal" className="cerrar4-modal"></label>
            </div>

            <div className="boton5-modal">
              <label htmlFor="btn5-modal" id="lolbelEliminarText">
                Abrir Modal
              </label>
            </div>
            <input type="checkbox" id="btn5-modal" />
            <div className="container5-modal">
              <div className="content5-modal">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2>Eliminar publicación</h2>{" "}
                  <span>
                    <label htmlFor="btn5-modal">
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

                <p>Estas seguro de eliminar esta publicación?</p>
                <div className="btn5-cerrar">
                  <label onClick={deletePostTexts}>Eliminar</label>
                </div>
              </div>
              <label htmlFor="btn5-modal" className="cerrar5-modal"></label>
            </div>
    </>
  );
};
