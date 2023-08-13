import { useState, useContext } from 'react';
import { contextUser } from '../../../../Hooks/userContext';
import { createPostImage } from '../../../../api/apiPosts';
import { useNavigate,Link } from 'react-router-dom';
import Swal from "sweetalert2";

export const CreatePost = () => {
  const navigate = useNavigate()
  let usercContextInfo = useContext(contextUser)
  const [descriptions, setDescriptions] = useState("");
  const [file, setFile] = useState(null);
  const [textoLoad, setTextoLoad] = useState('Subir')
  const selectedHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const selectedDescription = () => {
    let obtainDescription = document.getElementById("description").value;
    setDescriptions(obtainDescription);
  };
  const sendHandler = async () => {

    if (!file) {
      alert("Debes selecionar un archivo de imagen");


    } else {
      setTextoLoad('Subiendo...')
      let email = usercContextInfo.infoUser.email;
      const formdata = new FormData();
      formdata.append("description", descriptions);
      formdata.append("img", file);
      var result = await createPostImage(email, formdata);
      console.log(result);
    }
    if (result.data.data != "No disponible") {
      document.getElementById("description").value = null;
      document.getElementById("file").value = null;
      setFile(null);
      setDescriptions("");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Se cargo la publicación exitosamente",
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#064663",
        backdrop : "linear-gradient(#064663b6, #064663b6)",
        padding: "3em",
        color: "#064663",
        customClass: "border",
      });
      setTimeout(() => {
        setTextoLoad('Subir')
        navigate('/profile')
      }, 1500)
    }else{
      Swal.fire({
        position: "center",
        icon: "error",
        title: "ocurrio un error inesperado o tienes más de las publicaciones permitidas",
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#064663",
        backdrop : "linear-gradient(#064663b6, #064663b6)",
        padding: "3em",
        color: "#064663",
        customClass: "border",
      });
    }
    
  };

  return (
    <div className="log-in">
      <div data-aos="fade-left" data-aos-duration="1000" className="log-in-form">
        <h2>Bienvenido a</h2>
        <section>
          <img src="https://res.cloudinary.com/de2sdukuk/image/upload/v1681834064/Logo_st4un7.png" alt="logo" />
          <p>Face-Job</p>
        </section>
        <p>Crea tu publicación</p>
        <div className="form-post">
          <input id='description' placeholder='Descripción de la Imagen' type="text" onChange={selectedDescription} />
          <input placeholder='image' type="file" id="file" onChange={selectedHandler} />
          <button id="mandar" onClick={sendHandler}>{textoLoad}</button>
        </div>
        <Link to="/">volver</Link>
      </div>
    </div>
  )
}