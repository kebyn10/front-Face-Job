import React from 'react'
import { Link } from 'react-router-dom';
import { useContext,useState,useEffect } from "react";
import { contextUser } from '../Hooks/userContext';
import { getInfoPack } from "../api/api";

export const Paquetes = () => {
    
    let userContextInfo=useContext(contextUser)
    const [buttonChange,setButtonChange] = useState(false)

    useEffect(() => {
        async function loadButton() {
          const resp = await getInfoPack()
          if (resp.data == "no view pack") {
            setButtonChange(true)
          }
        }
        loadButton()
    },[])


  return (
    <div className="contain-membresia"> 
        <section className="member">
            <h2>Membresía</h2>
            <p className='member-info'>En Face-job, te ofrecemos tres paquetes para que elijas el que mejor se adapte a tus necesidades y presupuesto. Nuestra prioridad es cuidar tu bolsillo, por lo que nuestros precios son competitivos y accesibles para todos.</p>
            <div className="member_section">
                <div className="member_section-card">
                    <h3>Paquete 1</h3>
                    <div className="price">
                        <p>$10.000</p>
                        <p>COP</p>
                    </div>
                    <div className="list-benefits">
                        <ul>
                            <li> <span>✔</span> 5 vistas</li>
                            <li><span>✔</span> Acceso a contacto</li>
                            <li><span>✔</span> Chat con profesionales</li>
                            <li><span>✔</span> Ver publicaciones</li>
                        </ul>
                    </div> 
                    {buttonChange? <Link className="member-button" style={{cursor:"no-drop"}}>
                       No disponible <i className='bx bx-chevron-right'></i>
                    </Link> :
                    <Link className="member-button" to={userContextInfo.loged ? "/FormPay1" : "/login"}>
                       Comprar <i className='bx bx-chevron-right'></i>
                    </Link>} 
                </div>
                <div className="member_section-card">
                    <h3>Paquete 2</h3>
                    <div className="price">
                        <p>$18.000</p>
                        <p>COP</p>
                    </div>
                    <div className="list-benefits">
                        <ul>
                            <li> <span>✔</span> 10 vistas</li>
                            <li><span>✔</span> Acceso a contacto</li>
                            <li><span>✔</span> Chat con profesionales</li>
                            <li><span>✔</span> Ver publicaciones</li>
                        </ul>
                    </div>
                    {buttonChange? <Link className="member-button" style={{cursor:"no-drop"}}>
                       No disponible <i className='bx bx-chevron-right'></i>
                    </Link> :
                    <Link className="member-button" to={userContextInfo.loged ? "/FormPay2" : "/login"}>
                       Comprar <i className='bx bx-chevron-right'></i>
                    </Link>}
                </div>
                <div className="member_section-card">
                    <h3>Paquete 3</h3>
                    <div className="price">
                        <p>$25.000</p>
                        <p>COP</p>
                    </div>
                    <div className="list-benefits">
                        <ul>
                            <li> <span>✔</span> 15 vistas</li>
                            <li><span>✔</span> Acceso a contacto</li>
                            <li><span>✔</span> Chat con profesionales</li>
                            <li><span>✔</span> Ver publicaciones</li>
                        </ul>
                    </div>
                    {buttonChange? <Link className="member-button" style={{cursor:"no-drop"}}>
                       No disponible <i className='bx bx-chevron-right'></i>
                    </Link> :
                    <Link className="member-button" to={userContextInfo.loged ? "/FormPay3" : "/login"}>
                       Comprar <i className='bx bx-chevron-right'></i>
                    </Link>}
                </div>
            </div>
            <Link to="/" className='volver'>Volver</Link>
        </section>
    </div>
  )
}
