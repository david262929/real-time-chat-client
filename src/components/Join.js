import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"

const Join = () => {
    const [form, setForm] = useState({
        name : '',
        room : '',
    });

    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        })
    }

    const clickHandler = async event => {
        try{
            if(!form.room || !form.room){
                event.preventDefault();
            }
        }catch (e) {}
    }


    useEffect(() => {
        window.M.updateTextFields();
    }, [])

    return (
        <div className={"row"} style={{width: '100%'}}>
            <div className="col s6 offset-s3">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Join</span>
                        <br/>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Your Name"
                                    id="name"
                                    type="text"
                                    name="name"
                                    className={"yellow-input"}
                                    value={form.name}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Your Room ID"
                                    id="room"
                                    type="text"
                                    name="room"
                                    className={"yellow-input"}
                                    value={form.room}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="room">Room ID</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <Link to={`/chat?name=${form.name}&room=${form.room}`}
                            onClick={clickHandler}
                            className={"btn yellow darken-4"} style={{marginRight: 10}}
                            // disabled={loading}
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Join;