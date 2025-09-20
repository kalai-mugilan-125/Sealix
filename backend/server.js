const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => res.send('Sealix Backend'))
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI).then(()=> {
  app.listen(PORT, ()=> console.log('Backend running on', PORT))
}).catch(err => console.error('DB connect error', err))
