import React, { useState } from 'react'
import "./style.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from '@apollo/client';
import { CREATE_EVENT, GET_EVENTS } from '../queries/Queries';

const FormContainer = () => {

    const [data, setData] = useState({
        name: '',
        description: '',
        price: 0,
        date: new Date()
    })

    const [createEvent] = useMutation(CREATE_EVENT)

    const create = (e) => {
        e.preventDefault()
        createEvent({
            variables: {
                name: data.name,
                description: data.description,
                price: data.price,
                date: String(data.date.getTime()),
            },
            refetchQueries: [{
                query: GET_EVENTS
            }]
        })
    }

    return (
        <form className="create-form">
            <div className="input-field">
                <label>Event name:</label>
                <input placeholder="Event name"></input>
            </div>

            <div className="input-field">
                <label>Event description:</label>
                <textarea placeholder="Event description"></textarea>
            </div>


            <div className="input-fields">
                <div className="input-field">
                    <label>Event price:</label>
                    <input type="number" placeholder="Event price"></input>
                </div>

                <div className="input-field">
                    <label>Event date:</label>
                    <DatePicker
                        selected={data.date}
                        onChange={(d) => setData({...data, date: d})} />
                </div>
            </div>

            <button className="secondary-btn" onClick={create}>Create</button>


        </form>
    )
}

export default FormContainer
