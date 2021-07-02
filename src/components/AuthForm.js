import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CREATE_USER, LOGIN_USER } from '../queries/Queries'
import { AppContext } from '../utils/AppContext'

const AuthForm = (props) => {

    const { authType, route } = props

    const {login} = useContext(AppContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')

    const [createUser] = useMutation(CREATE_USER)
    const [userLogin] = useLazyQuery(LOGIN_USER, {
        onCompleted: someData => {
            login(someData.login.userId, someData.login.token, someData.login.tokenExp)
            // route.history.push('/')
        }
    })

    const handleAuth = (e) => {
        e.preventDefault()
        if (authType === 'login') {
            userLogin({
                variables: {
                    email: email,
                    password: String(password)
                }
            })
        }
        else {
            createUser({
                variables: {
                    email: email,
                    password: password
                }
            })
                .then(res => {
                    let user = {
                        email: res.data.createUser.email,
                        id: res.data.createUser.id
                    }
                    localStorage.setItem('user', JSON.stringify(user))
                    route.history.push('/')
                })
                .catch(er => {
                    setErr(er)
                })
        }
    }

    return (
        <div className="auth-component">
            <div className="auth-heading">
                {authType === 'login' ? <h2>Log In</h2> : <h2>Register</h2>}
            </div>
            {/* {error !== '' && <div className="error">{error}</div> } */}
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
