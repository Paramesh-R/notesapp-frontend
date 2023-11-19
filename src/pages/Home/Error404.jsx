import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
    return (
        <div className="d-flex flex-column align-item-center justify-content-center min-vh-100" >
            <div className="">

                <h1 className="display-1 fw-bold">404</h1>

                <p className="fs-3">
                    <span className="text-danger">Oops!</span> Page not found.
                </p>

                <p className="lead">
                    The page you’re looking for doesn’t exist.
                </p>

                <Link to="/" className=" btn btn-danger">Go Home</Link>

            </div>
        </div>
    )
}

export default Error404