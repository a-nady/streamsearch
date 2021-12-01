import React from 'react'
const Layout = require('./layout')
const NavBar = require('./navbar')

const Center = {
    textAlignVertical: "center",
    textAlign: "center"
}

function Login(props) {
    return (
        <Layout>
            {NavBar(false)}
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                                <p className="text-danger" style={Center}> {props.error} </p>
                                <form action="/login" method="post">
                                    <div className="form-floating mb-3">
                                        <input type="text" name="username" className="form-control" id="floatingInput"
                                               placeholder="Username" />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" name="password" className="form-control" id="floatingPassword"
                                               placeholder="Password" />
                                    </div>

                                    <div className="d-grid" style={Center}>
                                        <button value="login" name="action" className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                                            in
                                        </button>
                                    </div>
                                </form>
                                <br/>
                                <p style={Center}><a href="/register">New User? click here.</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

module.exports = Login
