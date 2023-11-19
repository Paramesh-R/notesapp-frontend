import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthCard from '../../components/Cards/AuthCard';

const ChangePassword = () => {

    const navigate = useNavigate();
    const { resetToken } = useParams();
    const [resetPasswordPayload, setResetPasswordPayload] = useState({ resetToken, password: "", confirmPassword: "" })
    // console.log(resetPasswordPayload)//Test

    const handleSubmit = async (ev) => {

        ev.preventDefault();

        // throw Error when Password does not match
        if (resetPasswordPayload.password !== resetPasswordPayload.confirmPassword) {
            toast.error(`Password does not match`)
            return true;
        }

        // throw Error when Password length is less than 8
        if (resetPasswordPayload.password.length < 8) {
            toast.error(`Password must be minimum 8 characters`)
            return true;
        }

        await axios
            .post(
                `${process.env.REACT_APP_SERVER_URL}/api/users/password/reset/${resetToken}`,
                { ...resetPasswordPayload },
                { withCredentials: true }
            )
            .then(
                function (response) {
                    // Handle successful response
                    if (response.data.success === true) {
                        setTimeout(() => { navigate("/signIn"); }, 3000);
                        toast.success(response.message);
                    }
                }
            )
            .catch(
                function (error) {


                    if (error.response.status === 404) {
                        return toast.error("User email does not exist", error)
                    }
                    toast.error(error.response.data)
                    setTimeout(() => { navigate("/signIn"); }, 1000);
                }
            )


    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setResetPasswordPayload({
            ...resetPasswordPayload,
            [name]: value,
        });
    };

    return (
        <>

            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="row">
                    <div className="col mx-auto">
                        <AuthCard title={"New Password"} logo_path={"../assets/images/logo.png"}>
                            {/* FORM - Sign Up */}
                                <form onSubmit={handleSubmit}>


                                    {/* -----------------Password 1----------------- */}
                                    <div className="form-floating mb-3">
                                        <input
                                            className="form-control"
                                            id="floatingPassword1"
                                            placeholder="Password"
                                            type="password"
                                            name="password"
                                            value={resetPasswordPayload.password}
                                            required
                                            onChange={(event) => handleOnChange(event)}
                                        />
                                        <label htmlFor="floatingPassword">
                                            <span className="text-muted">
                                                Enter New Password
                                            </span>
                                        </label>
                                    </div>
                                    {/* -------------------------------------------- */}

                                    {/* -----------------Password 2----------------- */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="floatingconfirmPassword"
                                            placeholder="Password"
                                            name="confirmPassword"
                                            value={resetPasswordPayload.confirmPassword}
                                            onChange={(event) => handleOnChange(event)}
                                        />
                                        <label htmlFor="floatingPassword">
                                            <span className="text-muted"
                                            >Re-Enter Password
                                            </span>
                                        </label>
                                    </div>
                                    {/* -------------------------------------------- */}

                                  

                                    {/* --------- BUTTON - UPDATE PASSWORD --------- */}
                                    <div className="d-grid">
                                        <button

                                            className='btn btn-login text-uppercase fw-bold btn-danger'
                                            disabled={(resetPasswordPayload.password === "" || resetPasswordPayload.confirmPassword === "")}
                                            type="submit"
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                    {/* -------------------------------------------- */}
                                </form>

                                <div className="m-3 text-center text-muted">
                                    <small>
                                        Existing User? <Link to={"/signIn"} className="text-muted">Sign In</Link>
                                    </small>
                                </div>
                        </AuthCard>
                       
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword