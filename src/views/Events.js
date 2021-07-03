import React, { useState, useEffect, useContext } from 'react'
import "./style.css"
import EventCard from "../components/EventCard"
import FormContainer from "../components/FormContainer"
import Tools from '../components/Tools'
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_BOOKED_EVENTS, GET_EVENTS, GET_USER } from '../queries/Queries';
import { AppContext } from '../utils/AppContext'

const Events = () => {

    const [selected, setSelected] = useState('all')
    const [userEvents, setUserEvents] = useState([])
    const [bookings, setBookings] = useState([])

    const { userId } = useContext(AppContext)

    const [getUserEvents] = useLazyQuery(GET_USER,{
        onCompleted: someData => {
            setUserEvents(someData.user.createdEvents)
        }
    })

    const [getBookedEvents] = useLazyQuery(GET_BOOKED_EVENTS,{
        onCompleted: someData => {
            setBookings(someData.bookings)
        }
    })

    const { data, loading } = useQuery(GET_EVENTS)

    useEffect(() => {
        if(selected === 'user'){
            getUserEvents({ variables: { id: userId } })
        }
        if(selected === 'booked'){
            getBookedEvents({variables: {userId: userId}})
        }
    }, [selected])

    if (loading) {
        return <p>Loading...</p>
    }

    console.log(bookings)

    return (
        <div className="view-container">

            <div className="view-flex">
                <div className="sub-container flex-child">

                    <Tools 
                    setSelected={setSelected}
                    selected={selected}/>

                    <div className="cards-container">
                        {
                            selected === 'all' ? (
                                data.events.map(e => (
                                    <EventCard event={e} selected={selected} />
                                ))
                            )
                            : selected === 'user' ? userEvents.map(e => (
                                <EventCard event={e} selected={selected} />
                            ))
                            : bookings.map(booking => (
                                <EventCard event={booking.event} selected={selected} />
                            ))
                        }
                    </div>
                </div>


                <div className="form-container flex-child">
                    <FormContainer />
                </div>
            </div>
        </div>
    )
}

export default Events
