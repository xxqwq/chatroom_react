import { Navigate } from "react-router-dom"

const PrivateRoute = ({ element: Element, ...rest }) => {
  const accessToken = localStorage.getItem('access_token')
  return accessToken ? <Element /> : <Navigate to='/login' />
}

export default PrivateRoute