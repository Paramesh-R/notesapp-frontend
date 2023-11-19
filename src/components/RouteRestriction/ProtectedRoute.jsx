import jwtDecode from 'jwt-decode'
import { useCookies } from 'react-cookie'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
// import AppBar from '../Appbar/AppBar'
import NavbarComp from '../Navbar/NavbarComp'
import { useEffect, useState } from 'react'

const ProtectedRoute = () => {
    const [cookies] = useCookies([])
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState("");


    // eslint-disable-next-line react-hooks/exhaustive-deps
    function isTokenExpired() {
        // return expired true - when no cookies 
        if (!cookies) {
            console.log('Private Route - no cookie')
            console.log(cookies)
            return true;
        }

        // return expired true - when decoded token expired
        if (cookies.token) {
            // Return Validated TOKEN expiration result
            const decodedToken = jwtDecode(cookies.token);
            return decodedToken.exp < (Date.now() / 1000);
        } else { /* Return Expired True when No token in cookies */
            console.log("Private Route - No token")
            console.log(cookies, userEmail)
            return true;
        }

    }


    // ------------Validate TOKEN Expiration (USE EFFECT)---------
    useEffect(() => {

        if (cookies.token) {                      // token exists and expired -> SignIn
            const token_expired = () => isTokenExpired(cookies.token)
            if (token_expired) {
                navigate("/signIn");
            }
            else {
                setUserEmail(jwtDecode(cookies.token).email)
            }
        } else {                                  // token does not exist -> SignIn
            console.log("No Token in Cookies");
            navigate("/signIn");
        }
    },[cookies.token, isTokenExpired, navigate])
    // -----------------------------------------------------------

    /* Show OUTLET if valid token else SignIn Page */
    return (
        isTokenExpired()
            ? <Navigate to="/signIn" />
            :
            <>
                {/* <AppBar userEmail={userEmail} /> */}
                <NavbarComp />
                <Outlet />
            </>

    )

}

export default ProtectedRoute