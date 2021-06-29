import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="header">
            <div className="header-flex">
                Book Events
                <div className="btn-flex">
                    <Link to="/login"><button className="primary-btn">Log In</button></Link>
                    <Link to="/register"><button className="primary-btn">Register</button></Link>
                </div>

            </div>

        </div>
    )
}

export default Header
