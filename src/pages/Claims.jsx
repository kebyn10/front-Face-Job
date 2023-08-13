import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Sidebar } from "../components/Header/Sidebar";
import bg from "../../src/assets/img/catalogue.jpg";

export const Claims = () => {
    
    let navigate=useNavigate()
    const refForm = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        const serviceId = "service_siwn19p"
        const tmplateId = "template_yb0b88j"

        const apiKey = "7hDrh624g_uBBd-Gn"

        emailjs.sendForm(serviceId,tmplateId,refForm.current,apiKey)
        .then(result => changeClaim(result.text))
        .catch(error => changeClaim(error))
    }

    function changeClaim(value) {
        if(value == "OK"){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Se envio la opinión",
                showConfirmButton: false,
                timer: 1500,
                iconColor : "#064663",
                backdrop : "linear-gradient(#064663b6, #064663b6)",
                padding : "3em",
                color: "#064663",
                customClass : "border", 
              });
              setTimeout(() => {
                navigate('/')
              }, 1500);    
        }else{
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Ocurrio un error con el envío",
                showConfirmButton: false,
                timer: 1500,
                iconColor : "#064663",
                backdrop : "linear-gradient(#064663b6, #064663b6)",
                padding : "3em",
                color: "#064663",
                customClass : "border", 
              });
        }
    }
    

    return (<>
        <Sidebar/>
        <section className="claims">
            <div className="claims-contain">
              <h2>Sobre nosotros</h2>
                <p>En Face-Job, estamos comprometidos en ayudar a los profesionales a mostrar sus habilidades y talentos a través de nuestra plataforma. Creemos que cada persona tiene un potencial único, y nuestra misión es proporcionar un espacio donde puedan mostrarlo y conectarse con otros profesionales y clientes.
                En Face-Job, valoramos la transparencia, la honestidad y la ética en todas nuestras operaciones. Nos esforzamos por brindar un servicio excepcional y satisfacer las necesidades de nuestros clientes de manera efectiva y eficiente.

                Estamos comprometidos en seguir mejorando y creciendo como empresa para brindar la mejor experiencia posible a nuestros usuarios. Gracias por elegir Face-Job como su plataforma profesional en línea.
                </p>
            </div>
            <div className="claims-contain-img"></div>
            <div className="claims-contain-img"></div>
                <div className="claims-contain">
                    <h2>Misión</h2>
                    <p>Face-Job quiere brindar a los profesionales la oportunidad de mostrar sus habilidades y formas de pensar a través de imágenes y publicaciones. Además, nos comprometemos a proporcionar a los clientes un amplio catálogo de profesionales con los que puedan interactuar y encontrar la ayuda que necesitan en su campo de interés.</p>
                </div>
            
                <div className="claims-contain">
                    <h2>Visión</h2>
                    <p>Ser la plataforma digital más innovadora y eficiente en conectar a profesionales con clientes, ofreciendo una experiencia de usuario excepcional y un catálogo amplio y diverso de profesionales en diferentes áreas, generando así un impacto positivo en la economía global y en la forma en que se desarrollan las relaciones laborales.</p>
                </div>
                <div className="claims-contain-img">
                
                </div>
            <div className="claims-contain-info">
                <h2>Que puedes hacer en esta sección</h2>
                <p>En FaceJob nos importa mucho tu opinión y sugerencias. Queremos que tengas una experiencia satisfactoria en nuestro aplicativo web, por lo que hemos creado una sección especial para que puedas expresarte libremente. ¿Te gustaría compartir alguna idea para mejorar la plataforma? ¿Hay algo que no te haya gustado o que te gustaría que cambie? ¡Queremos escucharte!
Tu opinión es muy importante para nosotros, ¡así que no dudes en hacerte escuchar! Juntos podemos hacer de FaceJob una plataforma cada vez mejor.
</p>
            </div>
            <div className="claims-form">
                <form ref={refForm} onSubmit={handleSubmit}>
                    <h2>Deja tu opinión</h2>
                    <input name="username" type="text" placeholder="Su nombre" />
                    <textarea name="message" cols="30" rows="10" placeholder="Escriba su opinión"></textarea>
                    <button>Enviar opinión</button>
                </form>
            </div>
        </section>
    </>
    )
}