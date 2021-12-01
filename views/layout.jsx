import React from 'react'
const NavBar = require('./navbar')

class Layout extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <html lang="en">
            <head>
                <title>StreamSearch</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                      crossOrigin="anonymous"/>
            </head>
            <body style={{
                background:'linear-gradient(to right, #430089, #82ffa1)'
            }}>
            {this.props.children}
            </body>
            </html>
        )
    }
}

module.exports = Layout