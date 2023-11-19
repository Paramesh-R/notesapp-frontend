
const AuthCard = ({ logo_path, title, children }) => {

    return (
        <div className="card border-0 shadow rounded-3 my-5 " style={{ minWidth: "350px", minHeight: "400px" }}>
            <div className="card-body p-4 p-sm-5">

                {/* Logo */}
                <div className="d-flex justify-content-center align-items-center p-1">

                    {logo_path ? <img
                        src={logo_path}
                        alt="logo"
                        loading="lazy"
                        className="w-4/5"
                    />
                        : <h1 className="display-6">Auth Card</h1>}
                </div>

                {/* Title */}
                <h5 className="card-title text-center mb-3 fw-light fs-3">
                    {title ? title : "title"}
                </h5>

                {/* Children */}
                {children}

            </div>
        </div>
    )
}

export default AuthCard