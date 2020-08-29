const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect("mongodb://root:admin1234@ds363098.mlab.com:63098/newsbee", {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then ( () => console.log("MonggoDB Connected.."))
  .catch(err => console.log(err))


//
app.get('/', (req, res) => {
  res.send('안녕 클레오파트라 세상에서 제일가는 포테이토칩')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})