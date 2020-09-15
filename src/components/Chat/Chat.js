import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import ScrollToBottom from 'react-scroll-to-bottom';
import "./Chat.scss";
import Message from "./Message";

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5002';

    const _test_messages_ = [
        {
            isSentMe : true,
            thumbUrl : 'https://davidghazaryan.ga/',
            text : `Hi br0000.`,
            name : 'Name of sender',
        },
        {
            isSentMe : false,
            thumbUrl : 'https://davidghazaryan.ga/',
            text : `Hi`,
        },
        {
            isSentMe : true,
            thumbUrl : 'https://davidghazaryan.ga/',
            text : `Hru?`,
            name : 'Name of sender',
        },
        {
            isSentMe : true,
            thumbUrl : 'https://davidghazaryan.ga/',
            text : `?`,
            name : 'Name of sender',
        },
        {
            isSentMe : false,
            thumbUrl : 'https://davidghazaryan.ga/',
            text : `im ok, and u?`,
        },
        {
            isSentMe : false,
            thumbUrl : 'https://davidghazaryan.ga/',
            text : `??`,
        },
        {
            isSentMe : false,
            thumbUrl : 'https://davidghazaryan.ga/',
            text : `??`,
        },
        {
            isSentMe : false,
            thumbUrl : 'https://davidghazaryan.ga/',
            text : `??`,
        },
        {
            isSentMe : false,
            thumbUrl : 'https://davidghazaryan.ga/',
            text : `??????????????????????????????????????????????????????`,
        },
        {
            isSentMe : true,
            thumbUrl : 'https://davidghazaryan.ga/',
            text : `OoookO oookOoookOoookOoookOo ookOoook OoookOoook OoookOooo kOoook`,
            name : 'Anun',
        },
        {
            isSentMe : true,
            thumbUrl : 'https://davidghazaryan.ga/',
            type : 'typing-progress',
            name : 'Anun',
        },
    ];

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

    return (
        <div className="row white-text chat">
            <h1 className="valign-wrapper chat-title">Chat</h1>

            <div className="col s12 offset-m2 m8 offset-l3 l6">
                <div className="card d-flex">
                    <div className="card-panel teal lighten-2 white-text chat-panel d-flex jc-sp_btw">

                        <div className="header d-flex jc-sp_btw">
                            <i className="material-icons red-text ">adjust</i>
                            <p style={{marginLeft: "2em"}}>roomName</p>
                        </div>
                        <div className="btn btn-floating btn-small teal">
                            <i className="material-icons  btn-close">close</i>
                        </div>
                    </div>


                    <ScrollToBottom className="card-content d-flex jc-sp_btw fd-col">

                        {_test_messages_.map( (data, key) => <Message data={data} key={key}/>)}
                    </ScrollToBottom>
                    <div className="card-actions teal darken-4 white-text d-flex jc-sp_btw">

                        <div className="input-area">
                            <textarea
                                type="text"
                                className="col s12 white-input materialize-textarea"
                                placeholder={"Aa"}
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
                        <div className="btn-area d-flex">
                            <span className="btn-floating btn-small teal pulse l2">
                                <i className="material-icons">send</i>
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;