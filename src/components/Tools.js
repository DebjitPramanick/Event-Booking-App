import React from 'react'

const Tools = (props) => {

    const {setSelected, selected} = props

    return (
        <div className="tools-container">
            <div className="navigators">
                <p onClick={() => setSelected('all')} 
                className={`${selected === 'all' ? 'cur' : ''}`}>All Events</p>
                <p onClick={() => setSelected('user')}
                className={`${selected === 'user' ? 'cur' : ''}`}>Your Events</p>
                <p onClick={() => setSelected('booked')}
                className={`${selected === 'booked' ? 'cur' : ''}`}>Your Bookings</p>
            </div>
        </div>
    )
}

export default Tools
