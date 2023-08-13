import { Form,Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { contextUser } from '../../../../Hooks/userContext'
import { useContext } from 'react'
import { sendMailEmail } from '../../../../api/api'
export const RecoveryPass = () => {
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
            <p>Unete a nosotros, crea tu perfil y sube publicaciones</p>
            <Formik
            initialValues={
            {
              email:"",
       
          }
            }
            onSubmit={async (values)=>{
               await context.changeEmail(values.email)
                 sendMailEmail(values)
            navigate('/RecoverCode')
            }}
            >
              {({handleChange,handleSubmit,isSubmitting})=>(
              <Form onSubmit={handleSubmit}>
                <input placeholder='Correo Electrónico' type="email" id="email" name='email' onChange={handleChange} />
                 <button type='submit'>enviar</button>
              </Form>
            )}
              </Formik> 
            <Link to='/signup'>¿No tienes cuenta? registrate</Link>
              <Link to="/">volver</Link>
            
           
        </div>
    </div>
  )
}
