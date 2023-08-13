import {Outlet,useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({isAllowsed,children,redirectTo="/"}) {
    const navigate=useNavigate()
    if (!isAllowsed) {
          return <Navigate to={redirectTo} />

    }
    return children ? children : <Outlet />
}

export default ProtectedRoute

