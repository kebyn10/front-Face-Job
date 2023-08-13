import { singUpUser } from "../../api/api";
import Swal from "sweetalert2";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export const SignUp = () => {
  let navigate=useNavigate()
  return (
    <div className="sign-up">
      <div
        data-aos="fade-right"
        data-aos-duration="1000"
        className="sign-up-form"
      >
        <h2>Bienvenido a</h2>
        <section>
          <img src="https://res.cloudinary.com/de2sdukuk/image/upload/v1681834064/Logo_st4un7.png" alt="logo" />
          <p>Face-Job</p>
        </section>
        <p>Unete a nosotros, crea tu perfil y sube publicaciones</p>
        <Formik
          initialValues={{
            name: "",
            lastname: "",
            date: "",
            number: "",
            profession: "",
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            values.profession
            
            if (values.profession!='' && values.profession!=undefined) {
         
            const response = await singUpUser(values);
            const {
              data: { data },
            } = response;
            if (data == "INSERT_OK") {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Registrado",
                showConfirmButton: false,
                timer: 1500,
                iconColor : "#064663",
                backdrop : "linear-gradient(#064663b6, #064663b6)",
                padding : "3em",
                color: "#064663",
                customClass : "border", 
              });
              setTimeout(()=>{
                navigate('/')
              },1500)
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Error al registrar",
                showConfirmButton: false,
                timer: 1500,
                iconColor : "#064663",
                backdrop : "linear-gradient(#064663b6, #064663b6)",
                padding : "3em",
                color: "#064663",
                customClass : "border", 
              });
            }
            }else{
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Aún hay datos sin completar",
                showConfirmButton: false,
                timer: 1500,
                iconColor : "#064663",
                backdrop : "linear-gradient(#064663b6, #064663b6)",
                padding : "3em",
                color: "#064663",
                customClass : "border", 
              });
            }
           
          }}
        >
          {({ handleChange, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <input
                placeholder="Nombre"
                type="text"
                name="name"
                onChange={handleChange}
                required
              />
              <input
                placeholder="Apellido"
                type="text"
                name="lastname"
                onChange={handleChange}
                required
              />
              <input
                placeholder="Fecha de nacimiento"
                type="date"
                name="date"
                onChange={handleChange}
                required
              />
              <input
                placeholder="Teléfono"
                type="number"
                name="number"
                onChange={handleChange}
                required
              />
              <select name="profession" onChange={handleChange} required>
                <option selected disabled>Elija una profesión</option>
                <option value="Diseñador grafico">Diseñador gráfico</option>
                <option value="Fotografo">Fotógrafo</option>
                <option value="Desarrollador de software">Desarrollador de software</option>
                <option value="Coach personal">Coach personal</option>
                <option value="Desarrollador de aplicaciones moviles">Desarrollador de aplicaciones móviles</option>
                <option value="Diseñador de interiores">Diseñador de interiores</option>
                <option value="No aplica">No aplica</option>
              </select>
              {/*<input
                placeholder="Profesion"
                type="text"
                name="profession"
                onChange={handleChange}
                required
          />*/}
              <input
                placeholder="Correo Electrónico"
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
              <input
                placeholder="Contraseña"
                type="password"
                name="password"
                onChange={handleChange}
                required
              />
              <button type="submit">
                {" "}
                {isSubmitting ? "Registrando..." : "Registrar"}{" "}
              </button>
            </Form>
          )}
        </Formik>
        <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
        <Link to="/">volver</Link>
      </div>
    </div>
  );
};
