import React from 'react'

const EventCard = (props) => {

    const {event} = props

    const getName = (email) => {
        const res = email.slice(0,1)
        return res.toUpperCase()
    }

    const getDate = (date) => {
        const d = Number(date)*1000
        const resDate = new Date(d)
        return `${resDate.getDate()}-${resDate.getMonth()}-${resDate.getFullYear()}`
    }

    return (
        <div className="card-container">
            <h3>{event.name}</h3>
            <p id="date">Event date: <span>{getDate(event.date)}</span></p>
            <p id="desc">{event.description}</p>
            <button className="secondary-btn">$ {event.price}</button>
            <div className="created-by">{getName(event.creator.email)}</div>
        </div>
    )
}

export default EventCard
