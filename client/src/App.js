import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Events from './views/Events'
import Login from './views/Login'
import Register from './views/Register'

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/" component={Events}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App
