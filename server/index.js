const express = require('express')
const app = express()

const { User} = require('./models/User');
const bodyParser = require('body-parser');
const config = require("./config/key");
const cookieParser = require('cookie-parser');
const {auth} = require('./middleware/auth')

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then ( () => console.log("MonggoDB Connected.."))
  .catch(err => console.log(err))

//application/x-www-form-urlencoded : 이 형식의 데이터 분석할 수 있게
app.use(bodyParser.urlencoded({extended:true}));
//application/json : json 데이터를 분석해서 가져올 수 있게
app.use(bodyParser.json());
app.use(cookieParser());




app.post('/api/users/register', (req, res) => {
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


app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 DB에서 찾는다
    User.findOne({email: req.body.email}, (err, user) =>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
    // 요청된 이메일이 DB에 있다면 비번이 맞는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({loginSuccess: false, messge: "비밀번호가 틀렸습니다."})
            
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지,
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({loginSuccess: true, userId: user._id})
            })
        })
    })
    // 비번까지 맞다면 토큰 생성하기
})



app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 미들웨어를 통과해왔다는 얘끼는 Authentication이 True라는 말.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.roll === 0? false: true, // role 0이면 일반유저, role 0이 아니면 관리자
        isAuth: true,
        email: req.user.email,
        lastname: req.user.lastname,
        role :req.user.role,
        image: req.user.image
    })
})


app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id},
        {token: ""}
        , (err, user) => {
            if(err) return res.json({success: false, err});
            return res.status(200).send({
                success:true
            })
        })
})


app.get('/api/hello', (req, res) => {
    res.send("안녕하세요~~")
})





const port = 5000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  