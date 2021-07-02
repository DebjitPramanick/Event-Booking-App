import React, { useContext, useState } from 'react'
import "./style.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from '@apollo/client';
import { CREATE_EVENT, GET_EVENTS } from '../queries/Queries';
import { AppContext } from '../utils/AppContext';

const FormContainer = () => {

    const { userId } = useContext(AppContext)

    const [data, setData] = useState({
        name: '',
        description: '',
        price: 0,
        date: new Date()
    })
    const [error, setError] = useState('')

    const [createEvent] = useMutation(CREATE_EVENT)

    const create = (e) => {
        e.preventDefault()
        createEvent({
            variables: {
                name: data.name,
                description: data.description,
                price: Number(data.price),
                date: String(data.date.getTime()),
                creator: userId
            },
            refetchQueries: [{
                query: GET_EVENTS
            }]
        }).catch(err => {
            setError(err)
        })
        setData({
            name: '',
            description: '',
            price: 0,
            date: new Date()
        })
    }

    return (
        <form className="create-form">
            <div className="input-field">
                <label>Event name:</label>
                <input placeholder="Event name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}>
                </input>
            </div>

            <div className="input-field">
                <label>Event description:</label>
                <textarea placeholder="Event description"
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}>
                </textarea>
            </div>


            <div className="input-fields">
                <div className="input-field">
                    <label>Event price:</label>
                    <input type="number" placeholder="Event price"
                        value={data.price}
                        onChange={(e) => setData({ ...data, price: e.target.value })}>
                    </input>
                </div>

                <div className="input-field">
                    <label>Event date:</label>
                    <DatePicker
                        selected={data.date}
                        onChange={(d) => setData({ ...data, date: d })} />
                </div>
            </div>

            <button className="secondary-btn" onClick={create}>Create</button>
            {error && <p className="error-message">{error}</p>}

        </form>
    )
}

export default FormContainer
