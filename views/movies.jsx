import React from "react";
const Layout = require('./layout');
const NavBar = require('./navbar');

const Margin = {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    textAlignVertical: "center",
    textAlign: "center"
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function Movies(props) {
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
                                        {props.wlistName}
                                    </h2>
                                    <form action="/dashboard/:wlist" method="post">
                                        <div className="input-group md-form form-sm form-2 pl-0">
                                            <input type="text" name="query" className="form-control my-0 py-1 pl-3 purple-border"
                                                   placeholder="Search for a movie to add" aria-label="Search"/>
                                        </div>
                                        <div className="d-grid" style={Margin}>
                                            <button value="login" name="action" className="btn btn-primary btn-login text-uppercase fw-bold" type="submit" >
                                                Search
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Year of Release</th>
                                    <th>Type of Content</th>
                                    <th>Description</th>
                                    <th>Available at</th>
                                </tr>
                                </thead>
                                <tbody>

                                {props.list.map((obj) => (
                                    <tr>
                                        <>
                                            <th scope="row">{obj.title}</th>
                                            <td>{obj.release}</td>
                                            <td>{capitalize(obj.type)}</td>
                                            <td style={{width:'40%'}}>{obj.description}</td>

                                            <td>
                                                <ul className="list-style-type:none" style={{listStyleType: 'none', paddingLeft:0, listStylePosition: 'outside'}}>
                                                {obj.services.map((service) =>(
                                                    <li className="mt-25">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor" className="bi bi-check"
                                                             viewBox="0 0 16 16">
                                                            <path
                                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                        </svg>{service}
                                                    </li>
                                                ))}
                                                </ul>
                                            </td>
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

module.exports = Movies