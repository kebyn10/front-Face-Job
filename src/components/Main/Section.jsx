import { Link } from 'react-router-dom';

export const Section = () => {
  return (
    <div className="section">
        <div className="section-info">
            <h2>Paquetes que ofrecemos</h2>
        <p>En Face-Job, ofrecemos tres paquetes cada uno diseñado para que los clientes pueden conectarse con más profesionales y recibir una gama más amplia de opciones para encontrar el mejor ajuste para sus necesidades. ¡Únete a nosotros hoy y descubre todo lo que Face-Job tiene para ofrecer!</p>
        </div>
      <div className="section-btn">
        <Link to="/paquetes">Ver más</Link>
        </div>
    </div>
  )
}
