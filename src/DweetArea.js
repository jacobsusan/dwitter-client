import React, { useState } from 'react';
import './DweetArea.css';
import {Button} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import useToken from './useToken';

function DweetArea(){
const [dweetMsg, setDweetMsg] = useState("");
const [dweetImg, setDweetImg] = useState("");
const { token, setToken } = useToken();

const dweetThis = e =>{
    e.preventDefault();
    const dweeterId = sessionStorage.getItem('userId');
    const url = 'http://localhost:3002/api/v1/users/'+dweeterId+'/dweets';
    fetch(url,{
        method: 'post',
        body: JSON.stringify({
            "dweetText" : dweetMsg,
            "dweetImg" : dweetImg
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer "+token
        }
    });
    setDweetImg("");
    setDweetMsg("");
           
}

    return(

        <div className="dweetArea">
            <form>
                <div className="dweetArea_input"> 
                    <input 
                        onChange={(e) => setDweetMsg(e.target.value)}
                        value={dweetMsg} 
                        placeholder="Dweet here ...">
                    </input>
                </div>

                <div className="dweetArea_input_2"> 
                    <input 
                        value={dweetImg}
                        onChange={(e) => setDweetImg(e.target.value)}
                        placeholder="Enter Image Url">
                    </input>
                    <Button type= "submit" className="dweetButton"
                    onClick={dweetThis}>Dweet</Button>
                </div>
            </form>
        </div>

    );
}

export default DweetArea;