import React from "react";
const Layout = require('./layout')
const NavBar = require('./navbar')

const Margin = {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    textAlignVertical: "center",
    textAlign: "center"
}

function convertTime(obj) {
    // translate time object into a more readable date (remove time as its not really necessary)
    return String(obj).split(' ').slice(1,4).join(' ')
}

function Dashboard(props) {
    return (
        <Layout>
            {NavBar(true)}
            <body className="hm-gradient">
            <main>
                <div className="container mt-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <h2 className="pt-3 pb-4 text-center font-bold font-up deep-purple-text">
                                        Watchlists
                                    </h2>
                                    <p className="text-danger" style={{textAlignVertical: "center", textAlign: "center"}}> {props.error} </p>
                                    <p className="text-success" style={{textAlignVertical: "center", textAlign: "center"}}> {props.success} </p>
                                    <form action="/dashboard" method="post">
                                        <div className="input-group md-form form-sm form-2 pl-0">
                                            <input type="text" name="watchlist" className="form-control my-0 py-1 pl-3 purple-border"
                                                   placeholder="Type your new watchlist here" aria-label="Add"/>
                                        </div>
                                        <div className="d-grid" style={Margin}>
                                            <button value="login" name="action" className="btn btn-primary btn-login text-uppercase fw-bold" type="submit" >
                                                Add
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Watchlist</th>
                                    <th>Created At</th>
                                    <th>Updated at</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {props.list.map((obj) => (
                                        <tr>
                                            <>
                                            <th scope="row"><a href={"/dashboard/" + obj.name}>{obj.name}</a></th>
                                            <td>{convertTime(obj.createdAt)}</td>
                                            <td>{convertTime(obj.updatedAt)}</td>
                                                <td>
                                                    <a href={"/dashboard/remove/" + obj.name}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd"
                                                              d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                                        <path fill-rule="evenodd"
                                                              d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                                    </svg></a></td>
                                            </>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            </body>
        </Layout>
    )
}

module.exports = Dashboard