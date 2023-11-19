import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/RouteRestriction/ProtectedRoute'
import Dashboard from './pages/Dashboard/Dashboard'
import Error404 from './pages/Home/Error404'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ThanksPage from './pages/Auth/ThanksPage'
import ActivateAccount from './pages/Auth/ActivateAccount'
import ChangePassword from './pages/Auth/ChangePassword'
import CreateNote from './pages/Notes/CreateNote'
import ViewNote from './pages/Notes/ViewNote'
import EditNote from './pages/Notes/EditNote'
// import RedirectShortUrl from './pages/shortenedUrl/RedirectShortUrl'

const MainRoutes = () => {
    return (
        <Routes>
            {/* Authentication Routes */}
            <Route path='/signIn' element={<SignIn />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />

            <Route path="/success" element={<ThanksPage />} />
            <Route path="/activate-account/:activationToken" element={<ActivateAccount />} />
            <Route path="/resetpassword/:resetToken" element={<ChangePassword />} />
            {/* <Route path="/:shortUrl" element={<RedirectShortUrl />} /> */}
            {/* PrivateRoute */}
            <Route path="/" element={<ProtectedRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/create" element={<CreateNote />} />
                <Route path={"/view/:id"} element={<ViewNote />} />
                <Route path={"/edit/:id"} element={<EditNote />} />
            </Route>


            {/* Error 404 */}
            <Route path='*' element={<Error404 />} />
        </Routes>
    )
}

export default MainRoutes