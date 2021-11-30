import React from 'react'
const Layout = require('./layout')
const NavBar = require('./navbar')

const Center = {
    textAlignVertical: "center",
    textAlign: "center"
}

function Search(props) {
    return (
        <Layout>
            {NavBar(props.loggedIn)}
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Search for Content</h5>
                                <p className="text-danger" style={{textAlignVertical: "center", textAlign: "center"}}> {props.error} </p>
                                <form action="/search" method="post">
                                    <div className="form-floating mb-3">
                                        <input type="text" name="query" className="form-control" id="floatingInput"
                                               placeholder="Search for movies or tv shows" />
                                    </div>

                                    <div className="d-grid" style={Center}>
                                        <button value="login" name="action" className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">
                                            Search
                                        </button>
                                    </div>
                                </form>
                                <br/>
                                {props.loggedIn ? (<></>) : (
                                    <p style={Center}><a href="/register">Want to keep track of what you want to watch? Click here.</a></p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

module.exports = Search
