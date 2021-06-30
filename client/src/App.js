import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Events from './views/Events'
import Login from './views/Login'
import Register from './views/Register'
import Header from "./components/Header"
import "./App.css"
import { AppContext } from './utils/AppContext'

const App = () => {

    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = (userId, token, tokenExp) => {
        setUserId(userId)
        setToken(token)
    }

    const logout = () => {
        setUserId(null)
        setToken(null)
    }

    return (
        <AppContext.Provider value={{
            token: token,
            userId: userId,
            login: login,
            logout: logout
        }}>
            <div>
                <Router>
                    <Header />
                    <Switch>
                        {token && <Redirect from="/login" to="/" exact />}
                        {!token && <Route path="/login" component={Login} />}
                        {!token && <Route path="/register" component={Register} />}
                        {token && <Route path="/" component={Events} />}
                    </Switch>
                </Router>
            </div>
        </AppContext.Provider>
    )
}

export default App
