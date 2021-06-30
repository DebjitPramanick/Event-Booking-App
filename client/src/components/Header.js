import React, { useContext } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import { AppContext } from '../utils/AppContext'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../queries/Queries'

const Header = () => {


    const { userId, token, logout } = useContext(AppContext)
    const { data, loading, error } = useQuery(GET_USER, { variables: { id: userId } })

    return (
        <div className="header">
            <div className="header-flex">
                Book Events
                {!token && !loading && error ?
                    (<div className="btn-flex">
                        <Link to="/login"><button className="primary-btn">Log In</button></Link>
                        <Link to="/register"><button className="primary-btn">Register</button></Link>
                    </div>)
                    : loading && !error ? <p>Loading...</p>
                    : !loading ?(
                        <div className="user-details-flex">
                            <p>fdsfsdsfsd</p>
                            <button className="primary-btn" onClick={logout}>Log Out</button>
                        </div>
                    ) : null
                }

            </div>

        </div>
    )
}

export default Header
