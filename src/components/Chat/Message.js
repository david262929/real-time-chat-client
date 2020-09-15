import React from 'react'

const getTypingProgress = () => (<div className="typing-progress d-flex jc-sp_btw">
    <div className="dot-loader"></div>
    <div className="dot-loader dot-loader--2"></div>
    <div className="dot-loader dot-loader--3"></div>
</div>)

const Message = ({data} ) => {
    const {text, thumbUrl, name} = data;
    let type = data.type || 'message';
    let isSentMe = data.isSentMe;
    isSentMe = typeof isSentMe !== 'undefined' ? isSentMe : true;

    let content = text;
    if( type === 'typing-progress' ) {
        isSentMe = true;
        content = getTypingProgress();
    }

    return (
        <div className={`message ${(isSentMe ? "me" : "them")}`}>
            <div className="thumb" style={{backgroundImage : `url('${thumbUrl}')`}}></div>
            <div className="text">{content}</div>
            {(isSentMe ? <div className="sender-name">{name}</div> : "")}
        </div>
    )
}

export default Message;