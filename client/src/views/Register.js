import React from 'react'
import AuthForm from '../components/AuthForm'
import "./style.css"

const Register = () => {
    return (
        <div className="view-container auth-container">
            <AuthForm authType="register"/>
        </div>
    )
}

export default Register
