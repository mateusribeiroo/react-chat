import React, {useRef} from 'react';
import style from './Join.module.css'
import io from 'socket.io-client'


export default function Join({setChatVisibility, setSocket}){

    const usernameRef = useRef(); 

    const handleSubmit = async () => {
        const username = usernameRef.current.value

        if(!username.trim()) return;
        
        const socket = await io.connect('http://localhost:3001')

        socket.emit('set_username', username)

        setSocket(socket);
        setChatVisibility(true);
    }

    document.addEventListener("keypress", function(e) {
        if(e.key === 'Enter') {
        
        var btn = document.querySelector("#submit");
          
        btn.click();
        
        }
      });

    return (
        <div className={style['join-container']}>
            <h1 className={style['join-title']}>Join</h1>
            <input className={style['name-input']} type='text' ref={usernameRef}  placeholder='Nome de usuário'/>
            <button id='submit' className={style['join-button']} onClick={() => handleSubmit()}>Entrar</button>
        </div>
    );
}


