import jwtDecode from 'jwt-decode'
import { useCookies } from 'react-cookie'
import { Navigate, Outlet, /* useNavigate */ } from 'react-router-dom'
// import AppBar from '../Appbar/AppBar'
import NavbarComp from '../Navbar/NavbarComp'
// import { useEffect, useState } from 'react'

const ProtectedRoute = () => {
    const [cookies] = useCookies([])
    // const navigate = useNavigate();

    // const [userEmail, setUserEmail] = useState("");


    // eslint-disable-next-line react-hooks/exhaustive-deps
    function isTokenExpired() {
        console.log("Is token expired");

        // return expired true - when no cookies
        if (!cookies || !cookies.token) {
            console.log('Private Route - no cookie');
            console.log(cookies);
            return true;
        }

        // return expired true - when decoded token expired
        const decodedToken = jwtDecode(cookies.token);
        return decodedToken.exp < Date.now() / 1000;
    }




    /* Show OUTLET if valid token else SignIn Page */
    return (
        isTokenExpired()
            ? <Navigate to="/signIn" />
            :
            (<>
                {/* <AppBar userEmail={userEmail} /> */}
                <NavbarComp />
                <Outlet />
            </>)

    )

}

export default ProtectedRoute

/* 
LEGACY CODE
// ------------Validate TOKEN Expiration (USE EFFECT)---------
    useEffect(() => {
        const checkTokenExpiration = async () => {
            if (cookies.token) {
                // token exists and expired -> SignIn
                console.log("Token Expired:", await isTokenExpired());
                if (await isTokenExpired()) {
                    console.log("inside 1st condition");
                    // navigate("/signIn");
                } else {
                    console.log("Inside 2nd condition");
                    setUserEmail(jwtDecode(cookies.token).email);
                }
            } else {
                // token does not exist -> SignIn
                console.log("No Token in Cookies");
                navigate("/signIn");
            }
        };

        checkTokenExpiration();
    }, [cookies.token, isTokenExpired, navigate, setUserEmail]);
    // -----------------------------------------------------------
    
    
    
    
    */