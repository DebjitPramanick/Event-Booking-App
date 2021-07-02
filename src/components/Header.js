import React, { useContext } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import { AppContext } from '../utils/AppContext'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../queries/Queries'

const Header = () => {


    const { userId, token, logout } = useContext(AppContext)
    const { data, loading, error } = useQuery(GET_USER, { variables: { id: userId !== '' ? userId : '' } })

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
                    : !loading && data !== null ?(
                        <div className="user-details-flex">
                            <p>{data.user.email.split('@')[0]}</p>
                            <button className="primary-btn" onClick={logout}>Log Out</button>
                        </div>
                    ) : <p>Not Looged In!</p>
                }

            </div>

        </div>
    )
}

export default Header
