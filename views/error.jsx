import React from "react";
const Layout = require('./layout')
const NavBar = require('./navbar')

function Error(props) {
    return (
    <Layout>
        {NavBar(props.loggedIn)}
            <div className="site-wrapper">
                <div className="site-wrapper-inner">
                    <div className="container" style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex:1,
                        color:'white'}}>
                            <br/>
                            <br/>
                            <h1 className="cover-heading">Oops</h1>
                            <p className="lead">Something wrong happened.</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
module.exports = Error;