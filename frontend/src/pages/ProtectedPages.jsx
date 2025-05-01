import {Outlet, Navigate} from 'react-router-dom'
import { jwtDecode } from "jwt-decode";


const ProtectedPages = () => {
    //Get user from localstorage
    const user = JSON.parse(localStorage.getItem('userData'))
  

    let isAuthenticated = false
    let isTokenValid = false;
    try {
        if (user) {
            const token = user?.accessToken;
            const decoded = jwtDecode(token)
            isTokenValid = Date.now() < decoded.exp * 1000;
            isAuthenticated = user && isTokenValid;
        }


    } catch (error) {
        console.error('Authentication check failed:', error)   
    }

  return (
   isAuthenticated ? <Outlet/> : <Navigate to='/auth' replace />
  )
}

export default ProtectedPages