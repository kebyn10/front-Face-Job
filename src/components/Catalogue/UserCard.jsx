import React, { useEffect, useState,useContext } from 'react'
import icon from '../../assets/img/bear.jpg'
import { useNavigate } from 'react-router-dom';
import { contextUser } from '../../Hooks/userContext';
import { infoPack,checkView,updateView } from "../../api/api";
import Swal from "sweetalert2";

export const UserCard = ({arrayProfessions}) => {
  const [professions,setProfessions]=useState([]);
let context=useContext(contextUser)
let navigate=useNavigate()
useEffect(()=>{
  function loadCards() {
     setProfessions(arrayProfessions.arrayProfessions)
  }
  loadCards()
 
},[arrayProfessions.arrayProfessions])

async function goProfile(params) {
  if (context.loged) {

   
      const resView = await checkView({emailUser:params})
    await context.chageEmailProfessions(params)
    if(resView.data == "Yes seen"){
      
        if (context.emailProfessions!="null") {
        navigate('/ProfileProfessions')
        }else{
          if (context.emailProfessions!="null") {
            navigate('/ProfileProfessions')
            }
        }
    }
    if(resView.data == "Not seen"){
      const response = await infoPack()
      if (response.data.data == "access") {
        const update = await updateView({emailUser:params})
        console.log(update.data);
        if (context.emailProfessions!="null") {
        navigate('/ProfileProfessions')
        }else{
        console.log("no cambio");
        }
      }else{
        Swal.fire({
          position: "center",
                icon: "warning",
                title: "Necesitas un paquete para ver el perfil",
                showConfirmButton: false,
                timer: 1500,
                iconColor : "#064663",
                backdrop : "linear-gradient(#064663b6, #064663b6)",
                padding : "3em",
                color: "#064663",
                customClass : "border", 
        }); 
        navigate('/paquetes')
      }
    }
    
    
    
  }else{
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Necesitas iniciar sesión",
      showConfirmButton: false,
      timer: 1500,
    }); 
    navigate('/login')
  }
 
}
  return (
<>
{professions.map((prof)=>(

    <section className="user-contain" key={prof.email}>
      <div className="user-card">
        <div className="user-info">
          <div className="user-icon">
            <img src={prof.iconUser} alt="icon"/>
          </div>
          <div>
            <h2>{prof.name}</h2>
            <p>{prof.profession}</p>
          </div>
        </div>
        <button onClick={()=>{goProfile(prof.email)}}>Ver más</button>
      </div>
    </section>
   
))}
 </>
  )
}
