import React,{useContext} from "react";
import { contextUser } from "../../Hooks/userContext";
import { Form, Formik } from "formik";
import { updateDataUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const Update = () => {
  let navigate = useNavigate();
  let userContextInfo = useContext(contextUser)
    
  return (
    <div className="log-in">
      <div
        data-aos="fade-left"
        data-aos-duration="1000"
        className="log-in-form"
      >
        <h2>Bienvenido a</h2>
        <section>
          <img src="https://res.cloudinary.com/de2sdukuk/image/upload/v1681834064/Logo_st4un7.png" alt="logo" />
          <p>Face-Job</p>
        </section>
        <p>Actualizar Datos</p>
        <Formik
          initialValues={{
            name: "",
            number: "",
            profession: "",
            lastname: "",
          }}
          onSubmit={async (values) => {
            try {
              
            if (values.profession!='' && values.profession!=undefined){
              const result = await updateDataUser(values);
              const {
                data: { data },
              } = result;
              if (data == "UPDATE_INFO") {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Cambio exitoso",
                  showConfirmButton: false,
                  timer: 1500,
                  iconColor: "#064663",
                  backdrop: "linear-gradient(#064663b6, #064663b6)",
                  padding: "3em",
                  color: "#064663",
                  customClass: "border",
                });
                setTimeout(() => {
                  navigate("/Ajustes");
                }, 1500);
              }
              if (data == "UPDATE_NOT") {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "No se actualizo la información",
                  showConfirmButton: false,
                  timer: 1500,
                  iconColor: "#064663",
                  backdrop: "linear-gradient(#064663b6, #064663b6)",
                  padding: "3em",
                  color: "#064663",
                  customClass: "border",
                });
              }
            }
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {({ handleChange, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder={userContextInfo.infoUser.name}
                type="text"
                id="name"
                onChange={handleChange}
                required
              />
              <input
                
                name="lastname"
                placeholder={userContextInfo.infoUser.lastname}
                type="text"
                id="lastname"
                onChange={handleChange}
                required
              />
              <input
                placeholder={userContextInfo.infoUser.number}
                type="text"
                id="number"
                onChange={handleChange}
                name="number"
                required
              />
              <select name="profession" onChange={handleChange} required>
                <option selected disabled>
                  Elija una profesión
                </option>
                <option value="Diseñador grafico">Diseñador gráfico</option>
                <option value="Fotografo">Fotógrafo</option>
                <option value="Desarrollador de software">
                  Desarrollador de software
                </option>
                <option value="Coach personal">Coach personal</option>
                <option value="Desarrollador de aplicaciones moviles">
                  Desarrollador de aplicaciones móviles
                </option>
                <option value="Diseñador de interiores">
                  Diseñador de interiores
                </option>
                <option value="No aplica">No aplica</option>
              </select>

              <button type="submit">
                {isSubmitting ? "Actualizando..." : "Actualizar"}
              </button>
              <Link to="/Ajustes">volver</Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
