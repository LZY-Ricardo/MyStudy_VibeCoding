const express = require('express')
const app = express()
const ejs = require('ejs')
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('index', {
      title: 'express',
      xss: req.query.xss
  })
})

app.listen(3000, () => {
  console.log('server is running on port 3000')
})
