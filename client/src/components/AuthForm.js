import { useMutation } from '@apollo/client'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { CREATE_USER } from '../queries/Queries'

const AuthForm = (props) => {

    const { authType } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [createUser] = useMutation(CREATE_USER)

    const handleAuth = (e) => {
        e.preventDefault()
        if(authType === 'login'){
            console.log("Log in")
        }
        else{
            createUser({
                variables: {
                    email: email,
                    password: password
                }
            })
        }
    }

    return (
        <div className="auth-component">
            <div className="auth-heading">
                {authType === 'login' ? <h2>Log In</h2> : <h2>Register</h2>}
            </div>
            <form className="authform-container">
                <div className="auth-field">
                    <label>Enter email: </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
                </div>

                <div className="auth-field">
                    <label>Enter password: </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
                </div>

                <button className="auth-btn" onClick={handleAuth}>
                    {authType === 'login' ? 'Log In' : 'Register'}
                </button>
            </form>
            <div className="help-flex">
                <Link to={`${authType === 'login' ? '/register' : '/login'}`}>
                    {authType === 'login' ? 'Register' : 'Log In'}
                </Link>
            </div>
        </div>
    )
}

export default AuthForm
