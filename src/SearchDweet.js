import React, { useState, useEffect } from 'react';
import './SearchDweet.css';
import SearchDweetItem from './SearchDweetItem.js';
import {Button} from '@material-ui/core';
import useToken from './useToken';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


function SearchDweet() {

    const [searchText, setSearchText] = useState("");
    const { token, setToken } = useToken();
    const [items, setItems] = useState([]);

    const searchHere = e => {

        console.log("Searching begins-------------->");
        e.preventDefault();

        var url = 'http://localhost:3002/api/v1/users/search/dweet?searchText=' + searchText;

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
                <a className="logOut" href="/logout" title="Log Out"> <ExitToAppIcon/></a>
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    placeholder="Search Dweets here ...">
                </input>
                <Button type="submit" className="searchButton"
                    onClick={searchHere}>Search Dweet</Button>
            </div>
            <div className="widgets_body">

                {items.map(item => {
                    return <SearchDweetItem key={item.id} fullName={item.fullName} uname={item.username} dweetText={item.dweetText} dweetImg={item.dweetImg}
                    createdAt={item.createdAt.substr(0,item.createdAt.indexOf('.'))} />
                })}
            </div>
        </div>


    );
}

export default SearchDweet;