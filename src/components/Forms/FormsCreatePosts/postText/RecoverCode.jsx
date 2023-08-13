import { Form,Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { contextUser } from '../../../../Hooks/userContext'
import { useContext } from 'react'
import { validateCodeEmail } from '../../../../api/api'
import Swal from 'sweetalert2'
export const RecoverCode = () => {
    let context=useContext(contextUser)
    let navigate=useNavigate()
  return (
    
    <div className="log-in">
      
        <div data-aos="fade-left" data-aos-duration="1000"  className="log-in-form">
            <h2>Bienvenido a</h2>
            <section>
                <img src="https://res.cloudinary.com/de2sdukuk/image/upload/v1681834064/Logo_st4un7.png" alt="logo" />
                <p>Face-Job</p>
            </section>
            <p>Escribe el codigo que se envio a tu correo</p>
            <Formik
            initialValues={
            {
              codigo:"",
       
          }
            }
            onSubmit={async (values)=>{
              console.log(context.recoverPass);
            const result=await validateCodeEmail(context.recoverPass,values)
            if(result.data.data=="CODE_VALIDE"){
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Codigo correcto",
                showConfirmButton: false,
                timer: 1500,
                iconColor : "#064663",
                backdrop : "linear-gradient(#064663b6, #064663b6)",
                padding : "3em",
                color: "#064663",
                customClass : "border", 
              });
              setTimeout(() => {
                navigate('/recoverNewPass')
              }, 1500);
            }else{
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Codigo incorrecto",
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
              {({handleChange,handleSubmit,isSubmitting})=>(
              <Form onSubmit={handleSubmit}>
                <input placeholder='Escribe el código' type="number" id="codigo" name='codigo' onChange={handleChange} />
                 <button>enviar</button>
              </Form>
            )}
              </Formik> 
     
              <Link to="/">volver</Link>
            
           
        </div>
    </div>
  )
}
