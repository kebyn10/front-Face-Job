import icon from '../../assets/img/bear.jpg'
import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { infoPack, checkView, updateView, consultTarget } from "../../api/api";
import { contextUser } from "../../Hooks/userContext";
import Swal from "sweetalert2";

export const MiniCard = () => {

  let context = useContext(contextUser)
  let navigate = useNavigate()
  const [infoUser, setInfoUser] = useState([])

  useEffect(() => {
    async function loadUser() {
      const resp = await consultTarget()
      setInfoUser(resp.data)
    }
    loadUser()
  }, [])

  async function goProfile(params) {
    if (context.loged) {
      const resView = await checkView({ emailUser: params })
      console.log(resView.data);
      await context.chageEmailProfessions(params)
      if (resView.data == "Yes seen") {

        if (context.emailProfessions != "null") {
          navigate('/ProfileProfessions')
        } else {
          console.log("no cambio");
        }
      }
      if (resView.data == "Not seen") {
        const response = await infoPack()
        if (response.data.data == "access") {
          const update = await updateView({ emailUser: params })
          console.log(update.data);
          if (context.emailProfessions != "null") {
            navigate('/ProfileProfessions')
          } else {
            console.log("no cambio");
          }
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Necesitas un paquete para ver el perfil",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/paquetes')
        }
      }

    } else {
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
      {
        infoUser.length > 0 ? infoUser.map((user) => (
          <div data-aos="fade-right" data-aos-duration="1000" className="mini-card" key={user.email}>
            <img src={user.iconUser} alt="Icon User" />
            <div className="mini-card-info">
              <h2>{user.name}</h2>
              <p>{user.profession}</p>
              <span onClick={() => { goProfile(user.email) }}>Ver Mas</span>
            </div>
          </div>
        )) : null

      }
    </>
  )
}
