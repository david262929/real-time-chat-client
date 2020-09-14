import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5002'

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT)

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, error => {
            if(error){
                console.log({error});
            }
        });

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', ({user, text}) => {
            setMessages([...messages, text])
        })
    }, [messages])

    const sendMessage = event => {
        event.preventDefault();
        if(message && message !== "") {
            socket.emit('sendMessage', message, () => {
                setMessage('')
            })
            console.log(message);
        }
    }

    console.log( 'data', {message, messages} )

    return (
        <div className="outerContainer">
            <div className="container">
                <h1>Chat</h1>
                <input
                    type="text"
                    value={message}
                    onChange={event => {
                        const { target: {value} } = event;
                        setMessage(value)
                    }}
                    onKeyPress={event => {
                        const {key, target: {value} } = event;
                        if(key !== "Enter" || value === ""){
                            return;
                        }
                        setMessage(value);
                        sendMessage(event);
                    }}
                />
            </div>
        </div>
    )
}

export default Chat;