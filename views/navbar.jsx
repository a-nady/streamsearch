import React from 'react'

function isLoggedIn(props) {
    if (props.user) {
        return true
    } else {
        return false
    }
}

function NavBar(state = false) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a href="/" className="navbar-brand">StreamSearch</a>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                    <div className="navbar-nav">
                        <a href="/search" className="nav-item nav-link active">Search</a>
                        {state ? (
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
        </nav>
    )
}

module.exports = NavBar
