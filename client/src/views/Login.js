import React from 'react'
import AuthForm from '../components/AuthForm'
import "./style.css"

const Login = (props) => {
    return (
        <div className="view-container auth-container">
            <AuthForm authType="login" route={props}/>
        </div>
    )
}

export default Login
