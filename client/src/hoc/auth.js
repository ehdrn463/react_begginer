import React, {useEffect} from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux'
import {auth} from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null){
    
    // option
    // null => 아무나 출입 가능한 페이지
    // true => 로그인한 유저만 출입 가능한 페이지
    // false => 로그인한 유저는 출입 불가능한 페이지

    // adminRoute 
    // 설정안하면 null -> 관리자만 접속가능하게 하려면 adminRoute = true로 설정
    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        useEffect(() => {

            dispatch(auth()).then(response=>{
                console.log(response);
                // 로그인하지 않은 상태
                if (!response.payload.isAuth){
                    if (option){
                        props.history.push('/login')
                    }
                } else {
                    // 로그인한 상태 -> 관리자, 비관리자
                    // 비관리자
                    if (adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    } else {
                        // 로그인한 유저가 출입불가능한 페이지인 경우
                        if(option === false)
                            props.history.push('/')
                    }
                    
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}