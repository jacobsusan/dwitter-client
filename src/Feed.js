import React, { useState, useEffect } from 'react';
import './Feed.css';
import DweetArea from './DweetArea';
import Dweets from './Dweets';
import useToken from './useToken';


function Feed() {

    const [items, setItems] = useState([]);
    const { token, setToken } = useToken();


    const bearedToken = "Bearer "+token;

    
    const dweeterId = sessionStorage.getItem('userId');

    useEffect(() => {
        let url = 'http://localhost:3002/api/v1/users/'+ dweeterId +'/feeds';
        fetch(url,{
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+token
            }
        })
            .then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                setItems(data);
            });
    }, []);

    return (
        <div className="feed">
            <DweetArea />

            {items.map(item => {
                return <Dweets key={item.id} dwtId={item.id}  userName={item.fullName} dweetText={item.dweetText}
                    uname={item.username} image={item.dweetImg} createdAt={item.createdAt.substr(0,item.createdAt.indexOf('.'))}/>
            })}
            {/* <Dweets userName="Susan" dweetText="This is a dweet by Susan" uname="@susan" 
            image="https://media.giphy.com/media/63I6FXZTXks2A/giphy.gif"/>
            <Dweets userName="Jain" dweetText="This is a dweet by jain" uname="@jain"/> */}
        </div>
    );
}

export default Feed;