const express = require('express')
const React = require('react')
const Home = require('../Page/Home.jsx').default
const { renderToString } = require('react-dom/server')

const app = express()

const content = renderToString(React.createElement(Home))

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>SSR</title>
            </head>
            <body>
                ${content}
                666666666666666
            </body>
        </html>
    `)
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
