import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookie from "universal-cookie";
let url = "https://backend-face-job.onrender.com";


export const LogIn = () => {
  const cookie = new Cookie()
  const navigate = useNavigate()
  const singInUser = async (values) => {
    return await axios.post(`${url}/loginCliente`, values);
  };

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
        <p>Hola de nuevo, inicia sesión para continuar</p>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            let response = await singInUser(values);
            const {
              data: { data, result, token },
            } = response;
            console.log(response);

            if (data == "logueado") {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Logueado",
                showConfirmButton: false,
                timer: 1500,
                iconColor : "#064663",
                backdrop : "linear-gradient(#064663b6, #064663b6)",
                padding : "3em",
                color: "#064663",
                customClass : "border",
                  
              });
              setTimeout(() => {
                document.cookie = `token=${response.data.token};max-age=${60 * 1440};path=/;samesite=strict`
                // cookie.set('token', response.data.token);
                window.location.href="/"
              }, 1500)

            } else if (data == "PASSWORD_ERROR") {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Contraseña incorrecta",
                showConfirmButton: false,
                timer: 1500,
                iconColor : "#064663",
                backdrop : "linear-gradient(#064663b6, #064663b6)",
                padding : "3em",
                color: "#064663",
                customClass : "border", 
              });
            } else if (data == "admin") {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Logueado Administrador",
                showConfirmButton: false,
                timer: 1500,
                iconColor : "#064663",
                backdrop : "linear-gradient(#064663b6, #064663b6)",
                padding : "3em",
                color: "#064663",
                customClass : "border", 
              });
              setTimeout(() => {
                document.cookie = `token=${response.data.token};max-age=${60 * 1440};path=/;samesite=strict`
                window.location.href = "/ADMIN"
              }, 1500)
            } else {
              Swal.fire({
                position: "center",
                icon: "warning",
                title: "El usuario no existe",
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
          {({ isSubmitting, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <input
                name="email"
                placeholder="Correo Electrónico"
                type="email"
                id="email"
                onChange={handleChange}
                required
              />
              <input
                placeholder="Contraseña"
                type="password"
                id="password"
                onChange={handleChange}
                name="password"
                required
              />
              <button type="submit">Iniciar Sesion</button>
            </Form>
          )}
        </Formik>
        <Link to="/signup">¿No tienes cuenta? registrate</Link>
        <Link to="/RecoveryPass">¿Olvidate tu contraseña? recuperala</Link>
        <Link to="/">volver</Link>
      </div>
    </div>
  );
};
