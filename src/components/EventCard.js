import { useMutation } from '@apollo/client'
import React, { useContext } from 'react'
import { BOOK_EVENT, CANCEL_BOOK_EVENT, GET_BOOKED_EVENTS } from '../queries/Queries'
import { AppContext } from "../utils/AppContext"

const EventCard = (props) => {

    const { userId } = useContext(AppContext)
    const { event, selected, booked, setSelected, booking } = props

    const [createBooking] = useMutation(BOOK_EVENT)
    const [cancelBooking] = useMutation(CANCEL_BOOK_EVENT)

    const cancelBookingEvent = () => {
        cancelBooking({
            variables: {
                id: booking.id,
            }, refetchQueries: [{ query: GET_BOOKED_EVENTS, variables: { userId: userId } }]
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const bookEvent = () => {
        createBooking({
            variables: {
                event: event.id,
                user: userId
            }, refetchQueries: [{ query: GET_BOOKED_EVENTS, variables: { userId: userId } }]
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const getName = (email) => {
        const res = email.slice(0, 1)
        return res.toUpperCase()
    }

    const getDate = (date) => {
        const d = Number(date)
        const resDate = new Date(d)
        return `${resDate.getDate()}-${resDate.getMonth()}-${resDate.getFullYear()}`
    }

    return (
        <div className="card-container">
            <h3>{event.name}</h3>
            <p id="date">Event date: <span>{getDate(event.date)}</span></p>
            <p id="desc">{event.description}</p>
            {
                selected === 'all' && event.creator.id === userId
                    ? <button className="secondary-btn">View Details</button>
                    : selected === 'booked' ? <button className="secondary-btn" onClick={cancelBookingEvent}>Cancel Booking</button>
                        : selected === 'user' ? <button className="secondary-btn">Delete Event</button>
                            : booked && booked.includes(event.id) ? <button className="secondary-btn" onClick={() => setSelected('booked')}>View Booking</button>
                                : <button className="secondary-btn" onClick={bookEvent}>$ {event.price}</button>
            }
            {selected === 'all' ? (
                <div className="created-by">{getName(event.creator.email)}</div>
            ) : null}
        </div>
    )
}
export default EventCard
