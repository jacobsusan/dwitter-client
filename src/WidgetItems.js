import React from "react";
import "./WidgetItems.css";
import { Button } from "@material-ui/core";
import useToken from './useToken';

function WidgetItems({ followMe, userName, createdAt, uname }) {

  const { token, setToken } = useToken();

    const followDweeter = (idToFollow) => {

        console.log("Following begins-------------->"+idToFollow);
        console.log(idToFollow.followMe);
        //e.preventDefault();

        const followerId = sessionStorage.getItem('userId');
        let dweeterId = idToFollow.followMe;

        //var url = 'http://localhost:3002/api/v1/dweeters/follow?dweeterId='+dweeterId+'&followerId=' + followerId;

        ///api/v1/dweeters/:dweeterId/following

        var url = 'http://localhost:3002/api/v1/users/'+followerId+'/following' ;

        console.log(url);

        //useEffect(() => {
            fetch(url,{
                method: 'post',
                body: JSON.stringify({
                    "userId" : dweeterId
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer "+token
                }
            })
                .then((response) => {
                  document.getElementById(idToFollow.followMe+"fb").style.display = "none";
                  return response.json();
                }).then((data) => {
                  document.getElementById(idToFollow.followMe+"fb").style.display = "none";
                  console.log(data);
                })
                .catch((err) => {
                  document.getElementById(idToFollow.followMe+"fb").style.display = "none";
                  console.log(err);
                });
        //}, []);


    }



  return (
    <div className="widgetItem">
      <div className="widgetItem_header">
        &nbsp;
        <h4>{userName}</h4>
        &nbsp;
        <p className="widgetItem_uname">{uname}</p>
      </div>

      <div className="widgetItem_body">
        <p className="dweet_date">Joined on {createdAt}</p>
        <Button type="submit" id={followMe+"fb"} className="followButton" onClick={() => followDweeter({followMe})}>
          Follow
        </Button>
      </div>
    </div>
  );
}

export default WidgetItems;
