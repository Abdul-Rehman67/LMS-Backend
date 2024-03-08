const express = require('express')
const dotenv = require('dotenv')

const { connectDB } = require('./src/db/config')
dotenv.config()

const app = express()
const port = process.env.PORT


app.get('/', (req, res) => {
  res.send('Hello expense tracker!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connectDB()
})