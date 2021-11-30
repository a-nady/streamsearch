import React from 'react'
import NavBar from "./navbar";
const Layout = require('./layout')

const Center = {
    textAlignVertical: "center",
    textAlign: "center"
}

function Register(props) {
    return (
        <Layout>
            {NavBar(false)}
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Register</h5>
                                <p className="text-danger" style={{textAlignVertical: "center", textAlign: "center"}}> {props.error} </p>
                                <form action="/register" method="post">
                                    <div className="form-floating mb-3">
                                        <input type="text" name="username" className="form-control" id="floatingInput"
                                               placeholder="Username" />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" name="password" className="form-control" id="floatingPassword"
                                               placeholder="Password" />
                                    </div>

                                    <div className="d-grid" style={Center}>
                                        <button value="login" name="action" className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Register
                                        </button>
                                    </div>
                                </form>
                                <br/>
                                <a href="/login"><p style={Center}>Existing User? click here.</p></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

module.exports = Register
