import React, { useState } from "react";
import "./Dweets.css";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import useToken from './useToken';

function Dweets({ dwtId, userName, dweetText, uname, image, createdAt }) {

  const [dweetMsg, setDweetMsg] = useState("");
  const [items, setItems] = useState([]);
  const [commentItems, setCommentItems] = useState([]);
  const { token, setToken } = useToken();

  const reactOnDweet = (idOfDweet) => {
    const reactorId = sessionStorage.getItem('userId');
    var url =
      "http://localhost:3002/api/v1/users/reactions/" + idOfDweet.dwtId;

    fetch(url, {
      method: "post",
      body: JSON.stringify({
        reactorId: reactorId
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer "+token
      },
    })
      .then((response) => {
        console.log(response.json);
        document.getElementById(idOfDweet.dwtId).style.display = "none";
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        document.getElementById(idOfDweet.dwtId).style.display = "none";
      });
  };

  const reactedBy = (idOfDweet) => {
    var url =
      "http://localhost:3002/api/v1/users/reactions/" + idOfDweet.dwtId;

    fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer "+token
      },
    })
      .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        setItems(data);
      })
      .catch((err) => {
      });
  };

  const commentOnDweet = (idOfDweet) => {
    const commenterId = sessionStorage.getItem('userId');
    var url =
      "http://localhost:3002/api/v1/users/comments/" + idOfDweet.dwtId;

    fetch(url, {
      method: "post",
      body: JSON.stringify({
        commenterId: commenterId,
        commentText: dweetMsg
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer "+token
      },
    })
      .then((response) => {
        console.log(response.json);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setDweetMsg("");
      })
      .catch((err) => {
      });

  };

  const getComments = (idOfDweet) => {
    var url =
      "http://localhost:3002/api/v1/users/comments/" + idOfDweet.dwtId;

    fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer "+token
      },
    })
      .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        setCommentItems(data);
      })
      .catch((err) => {
      });
  };


  return (
    <div className="dweet">
      <div className="dweet_header">
        <PermIdentityIcon />
        &nbsp;
        <h4>{userName}</h4>
        &nbsp;
        <p className="dweet_uname">{uname}</p>
      </div>
      <div className="dweet_body">
        <p>{dweetText}</p>
        <img src={image} alt="" />
      </div>
      <div className="dweet_footer">
        <p>{createdAt}</p>

        <div className="like_area">
            <div className="pointer" title="Like this dweet" id={dwtId }>
                <ThumbUpAltOutlinedIcon onClick={() => reactOnDweet({ dwtId })} />
            </div>
            &nbsp;
            <div className="pointer" title="Dweeters who have already liked this dweet" >
                <span onClick={() => reactedBy({ dwtId })} >Liked By</span>
            </div>
        </div>

        <div className="pointer dweetComment like_area" title="Comment on this dweet">
          <input
            onChange={(e) => setDweetMsg(e.target.value)}
            value={dweetMsg}
            placeholder="Comment here ..."
          ></input>
          <ChatBubbleOutlineOutlinedIcon onClick={() => commentOnDweet({ dwtId })} />
          <div className="pointer" title="Dweeters who have already commented on this dweet" >
                <span onClick={() => getComments({ dwtId })} >Comments</span>
            </div>
        </div>

      </div>

      <div className="dweet_reactors" >

      {items.map(item => {
                
        return <p key={item.id}>{item.fullName} {item.username} on {item.createdAt.substr(0,item.createdAt.indexOf('.'))}</p>
            })}

      </div>
      <div className="dweet_reactors" >

      {commentItems.map(item => {
                
        return <span><p className="dweet_uname" key={item.id}>{item.fullName} {item.username}  on {item.createdAt.substr(0,item.createdAt.indexOf('.'))}:</p>
                <p>{item.commentText}</p><br /></span>
            })}

      </div>

    </div>
  );
}

export default Dweets;
