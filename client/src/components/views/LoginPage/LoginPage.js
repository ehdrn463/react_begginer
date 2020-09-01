import React, {useState} from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
// import { response } from 'express'; 이거 열어놓으면 오류남

function LoginPage(props) {
    // state에 변화시켜 데이터에 변화를 줌
    // email, password를 위한 state
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) =>{
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response =>{
                if(response.payload.loginSuccess){
                    props.history.push('/')
                } else{
                    alert('error')
                }
            })
    }

    return (
        <div style = {{display: 'flex', justifyContent: 'center',
        alignItems: 'center', width: '100%', height: '100vh'}}>
            <form style = {{display: 'flex', flexDirection: 'column'}}
                onSubmit = {onSubmitHandler}
            >
                <label>Email</label>
                {/* 타이핑할 때 value가 바뀌도록 */}
                <input type = "email" value={Email} onChange = {onEmailHandler} />
                <label>Password</label>
                <input type = "password" value={Password} onChange = {onPasswordHandler}/>
                <br />
                <button>
                    Login
                </button>
            </form>

        </div>
    )
}

export default withRouter(LoginPage)
