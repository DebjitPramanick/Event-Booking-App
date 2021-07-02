import React, { useState, useEffect, useContext } from 'react'
import "./style.css"
import EventCard from "../components/EventCard"
import FormContainer from "../components/FormContainer"
import Tools from '../components/Tools'
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_EVENTS, GET_USER } from '../queries/Queries';
import { AppContext } from '../utils/AppContext'

const Events = () => {

    const [selected, setSelected] = useState('all')
    const [userEvents, setUserEvents] = useState([])

    const { userId } = useContext(AppContext)
    console.log(userId)
    const [user] = useLazyQuery(GET_USER, { variables: { id: userId } },{
        onCompleted: someData => {
            console.log(someData)
            setUserEvents(someData.user.createdEvents)
        }
    })

    console.log(userEvents)
    const { data, loading } = useQuery(GET_EVENTS)

    useEffect(() => {
        if(selected === 'user'){
            console.log(selected)
            user()
        }
    }, [selected])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className="view-container">

            <div className="view-flex">
                <div className="sub-container flex-child">

                    <Tools setSelected={setSelected}/>

                    <div className="cards-container">
                        {
                            data.events.map(e => (
                                <EventCard event={e} />
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
