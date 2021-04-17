import React,{ useState } from "react";
import { Button } from "@material-ui/core";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const logIn = (e) => {

    console.log(userName);
    console.log(password);

   /* e.preventDefault();
    const url = "http://localhost:3002/api/v1/dweeters/" ;
    fetch(url, {
      method: "post",
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.json);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });*/

    window.open("http://localhost:3000/App.js");

    setUserName("");
    setPassword("");

  };

  return (
    <div className="login">
      <input
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
        placeholder="Username"
      ></input>

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
      ></input>

      <Button type="submit" className="dweetButton" onClick={logIn}>
        Log In
      </Button>
    </div>
  );
}

export default Login;
