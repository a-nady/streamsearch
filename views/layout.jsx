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
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity=""
                        crossOrigin="anonymous"></script>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                      crossOrigin="anonymous"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui"/>
            </head>
            <body style={{
                background:'linear-gradient(to right, #430089, #82ffa1)',
                height: '100%',
                overflow: 'auto'
            }}>
            {this.props.children}
            </body>
            </html>

        )
    }
}

module.exports = Layout