import React from 'react'
import AuthForm from '../components/AuthForm'
import "./style.css"

const Register = (props) => {
    return (
        <div className="view-container auth-container">
            <AuthForm authType="register" route={props}/>
        </div>
    )
}

export default Register
