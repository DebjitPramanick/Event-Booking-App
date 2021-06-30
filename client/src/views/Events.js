import React, {useEffect} from 'react'
import "./style.css"
import EventCard from "../components/EventCard"
import FormContainer from "../components/FormContainer"
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../queries/Queries';

const Events = () => {

    const {data, loading} = useQuery(GET_EVENTS)

    if(loading){
        return <p>Loading...</p>
    }

    return (
        <div className="view-container">

            <div className="view-flex">
                <div className="cards-container flex-child">
                    {
                        data.events.map(e => (
                            <EventCard event={e}/>
                        ))
                    }
                </div>

                <div className="form-container flex-child">
                    <FormContainer />
                </div>
            </div>
        </div>
    )
}

export default Events
