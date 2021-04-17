import React, { useState, useEffect } from 'react';
import './Widgets.css';
import WidgetItems from './WidgetItems.js';
import {Button} from '@material-ui/core';
import useToken from './useToken';




function Widgets() {

    const [searchText, setSearchText] = useState("");
    const { token, setToken } = useToken();
    const [items, setItems] = useState([]);

    const searchHere = e => {

        console.log("Searching begins-------------->");
        e.preventDefault();

        var url = 'http://localhost:3002/api/v1/users/search/dweeter?searchText=' + searchText;
       // var url = 'http://localhost:3002/v1/getDweets';

        console.log(url);

        //useEffect(() => {
            fetch(url,{
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer "+token
                }
            })
                .then((response) => {
                    console.log(response.json);
                    return response.json();
                }).then((data) => {
                    console.log(data);
                    setItems(data);
                });
        //}, []);

        setSearchText("");

    }

    return (

        <div className="widgets">
            <div className="widgets_input">
                <input className="widgets_input_box"
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    placeholder="Search Dweeters here ...">
                </input>
                <Button type="submit" className="searchButton"
                    onClick={searchHere}>Search Dweeter</Button>
            </div>
            <div className="widgets_body">

                {items.map(item => {
                    return <WidgetItems key={item.id} followMe={item.id} userName={item.fullName} uname={item.username}
                    createdAt={item.createdAt.substr(0,item.createdAt.indexOf('.'))} />
                })}
            </div>
        </div>


    );
}

export default Widgets;