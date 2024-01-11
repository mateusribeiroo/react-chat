import React, {useRef, useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import style from './Chat.module.css'

export default function Chat({socket}){

    const messageRef = useRef();
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket.on('receive_message', data => {
            setMessageList((current) => [...current, data])
        })

        return () => socket.off('receive_message');
    }, [socket])

    const handleSubmit = async () => {
        const message = messageRef.current.value;

        if(!message.trim()) return;
        
        socket.emit('message', message);
        clearInput();
    }

    const clearInput = () => {
        messageRef.current.value = '';
    }

    document.addEventListener("keypress", function(e) {
        if(e.key === 'Enter') {
        
        var btn = document.querySelector("#submit");
          
        btn.click();
        
        }
    });

    return(
        <div className={style['chat-container']}>
            <h1 className={style['chat-title']}>Chat</h1>
            <div className={style['chat-itself']}>
                {
                    messageList.map((message, index) => { 
                        if(socket.id === message.authorId){
                            return (
                                <div className={style['chat-self-message-container']}>
                                    <p className={style['chat-self-message']} key={index}>{message.text}</p>
                                </div>
                            ) 
                        }else if(message.author == 'server'){
                            return (
                                <div className={style['chat-server-message-container']}>
                                    <p className={style['chat-server-message']} key={index}>{message.text}</p>
                                </div>
                            )
                        }
                        else{
                            return (
                                <div className={style['chat-someone-message-container']}>
                                    <p className={style['chat-someone-message']} key={index}>{message.author ? message.author+':' : ''}  {message.text}</p>
                                </div>
                            )
                      
                    }})
                }
            </div>
            <div  className={style['chat-input-container']}>
                <input className={style['chat-input']} type='text' ref={messageRef} placeholder='Digite sua mensagem'/>
                <button id='submit' className={style['chat-button']} onClick={() => handleSubmit()}><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
        </div>
    )
}