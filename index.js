const express = require('express')
const app = express()
const port = 3000
const { User} = require('./models/User');
const bodyParser = require('body-parser');
const config = require("./config/key")

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then ( () => console.log("MonggoDB Connected.."))
  .catch(err => console.log(err))

//application/x-www-form-urlencoded : 이 형식의 데이터 분석할 수 있게
app.use(bodyParser.urlencoded({extended:true}));
//application/json : json 데이터를 분석해서 가져올 수 있게
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    // 회원가입할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body)  // body 안에는 json 형식으로 정보가 저장되어 있음
    user.save((err, userInfo) =>{
        if (err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    }) // 몽고db 문법

})


app.get('/', (req, res) => {
  res.send('안녕 클레오파트라 세상에서 제일가는 포테이토칩2')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})