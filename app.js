const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const { connectDB } = require('./src/db/config')
const authRoute = require('./src/routes/auth')
const bookRoute = require('./src/routes/books')
dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors());
app.options('*', cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello From LMS')
})
// 

app.use('/auth', authRoute)
app.use('/book', bookRoute)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connectDB()
})