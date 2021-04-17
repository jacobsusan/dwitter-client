import React from "react";
import "./SearchDweetItem.css";
import { Button } from "@material-ui/core";

function SearchDweetItem({ fullName, uname, dweetText, dweetImg, createdAt }) {

  



  return (
    <div className="widgetItem">
      <div className="searchItem_header">
        &nbsp;
        <h4>{fullName}</h4>
        &nbsp;
            <p className="dweet_uname">{uname}</p>
      </div>
      <p>{dweetText}</p>
      <img src={dweetImg} alt=""/>
      <br />
      <p className="dweet_date">{createdAt}</p>
      

      
    </div>
  );
}

export default SearchDweetItem;
