import React from 'react'


function NavBar(loggedIn = false) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <div className="container-fluid">
                <a href="/" className="navbar-brand">StreamSearch</a>

                <div className="dropdown">
                    <button className="navbar-toggler" type="button" id="dropdownMenuButton1"
                             aria-expanded="false" data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                    <div className="navbar-nav">
                        <a href="/search" className="nav-item nav-link active">Search</a>
                        {loggedIn ? (
                            <a href="/logout" className="nav-item nav-link active">Logout</a>
                        ) : (
                            <>
                            <a href="/login" className="nav-item nav-link active">Login</a>
                                <a href="/register" className="nav-item nav-link active">Register</a>
                            </>
                        )}
                    </div>

                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                    crossOrigin="anonymous"></script>
        </nav>

    )
}

module.exports = NavBar
