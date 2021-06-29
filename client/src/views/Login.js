import React from 'react'
import AuthForm from '../components/AuthForm'
import "./style.css"

const Login = () => {
    return (
        <div className="view-container auth-container">
            <AuthForm authType="login"/>
        </div>
    )
}

export default Login
