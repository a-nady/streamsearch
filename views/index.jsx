import React from "react";
const Layout = require('./layout')
const NavBar = require('./navbar')

function Home(props) {
    return (
    <Layout>
        {NavBar(false)}
            <div className="site-wrapper">
                <div className="site-wrapper-inner">
                    <div className="container" style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex:1,
                        color:'white'}}>
                            <br/>
                            <br/>
                            <h1 className="cover-heading">StreamSearch</h1>
                            <p className="lead">A one-stop shop for finding content you're subscribed to.</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
module.exports = Home;