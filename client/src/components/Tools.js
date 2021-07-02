import React from 'react'

const Tools = (props) => {

    const {setSelected} = props

    return (
        <div className="tools-container">
            <div className="navigators">
                <p onClick={() => setSelected('all')}>All Events</p>
                <p onClick={() => setSelected('user')}>Your Events</p>
            </div>
        </div>
    )
}

export default Tools
