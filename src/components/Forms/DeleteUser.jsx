import React, { useState } from 'react'
import { Form, Formik } from "formik";
import { deleteDataUser } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'universal-cookie'
import Swal from "sweetalert2";

export const DeleteUser = () => {
    let navigate = useNavigate()
    const cookies = new Cookies();
    const [textDelete, setTextDelete] = useState('Eliminar')
    const closeSesion = () => {
        cookies.remove('token', { path: "/" })
        window.location.href = "/"
    }

    return (
        <div className='log-in'>
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
                <p>Eliminar cuenta</p>
                <Formik
                    initialValues={{
                        password: ""
                    }}
                    onSubmit={async (values) => {
                        try {
                            setTextDelete('Eliminando...')
                            const result = await deleteDataUser(values)
                            console.log(values);
                            console.log(result);
                            if (result.data.data == "eliminado") {
                                setTextDelete('Eliminar')
                                closeSesion()
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Se elimino la cuenta",
                                    showConfirmButton: false,
                                    timer: 1500,
                                    iconColor: "#064663",
                                    backdrop : "linear-gradient(#064663b6, #064663b6)",
                                    padding: "3em",
                                    color: "#064663",
                                    customClass: "border",
                                });
                                setTimeout(() => {
                                    navigate('/')
                                }, 1500);
                            }
                            else {
                                Swal.fire({
                                    position: "center",
                                    icon: "error",
                                    title: "No se elimino la cuenta",
                                    showConfirmButton: false,
                                    timer: 1500,
                                    iconColor : "#064663",
                                    backdrop : "linear-gradient(#064663b6, #064663b6)",
                                    padding : "3em",
                                    color: "#064663",
                                    customClass : "border", 
                                  });
                            }


                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >
                    {({ handleChange, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <input
                                placeholder="Contraseña actual"
                                type="password"
                                id="password"
                                onChange={handleChange}
                                name="password"
                                required
                            />
                            <button type="submit">{textDelete}</button>
                            <Link to="/Ajustes">volver</Link>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}