import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import bcrypt from 'bcryptjs';

async function loginUser(credentials) {

  console.log("---------------------");
  console.log(credentials);

  // var hashedPassword = credentials.password;


  //   bcrypt.genSalt(10, function(err, salt) {
  //     bcrypt.hash(credentials.password, salt, function(err, hash) {
  //         console.log(hash);
  //         hashedPassword = hash;
  //     });
  // });

  // credentials.password = hashedPassword;

//   var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync(credentials.password, salt);


// console.log(hash);

// var check = bcrypt.compareSync(credentials.password, hash);
// console.log(check);

// credentials.password = hash;
//   console.log("----------------ff-----");
//   console.log(credentials);


  return fetch('http://localhost:3002/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json());
    
 }

 async function getUserId(token,username) {

  console.log("---------------------getUserId");
  console.log(token);
  console.log(token.token);
  const bearedToken = "Bearer "+token.token;

  return fetch('http://localhost:3002/api/v1/users/'+username, {
    method: 'get',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : bearedToken
  }
  })
    .then((response) => {
      console.log(response);
      return response.json();
  }).then((data) => {
      console.log(data);
      return data;
  });
  }


export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  
  const [username_signUp, setUserName_signUp] = useState();
  const [fullname_signUp, setFullName_signUp] = useState();
  const [password_signUp, setPassword_signUp] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(password);
    
    
    
    
    const token = await loginUser({
      username,
      password
    });
    const userId = await getUserId(token,username);


    sessionStorage.setItem('userId', userId[0].id);

    setToken(token);
  }


  const signUpUser = e =>{
    e.preventDefault();
    const url = 'http://localhost:3002/signup';
    fetch(url,{
        method: 'post',
        body: JSON.stringify({
            "username" : username_signUp,
            "fullName" : fullname_signUp,
            "password" : password_signUp
        }),
        headers: {
            "Content-Type": "application/json",
        }
    });
    setUserName_signUp("");
    setPassword_signUp("");
    setFullName_signUp("");
}

  return(
    <div className="login-wrapper">
      <h1>Log In</h1>
    <form onSubmit={handleSubmit}>
      <label>
        <p>User Name</p>
        <input  type="text" onChange={e => setUserName(e.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)}/>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>

    <br />
    <br />
    <br />


      <h1>Sign Up</h1>
    <form onSubmit={signUpUser}>
      <label>
        <p>Full Name</p>
        <input type="text" value={fullname_signUp} onChange={e => setFullName_signUp(e.target.value)}/>
      </label>
      <label>
        <p>User Name</p>
        <input type="text" value={username_signUp} onChange={e => setUserName_signUp(e.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" value={password_signUp} onChange={e => setPassword_signUp(e.target.value)}/>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>

    </div>
  )
}


Login.propTypes = {
  setToken: PropTypes.func.isRequired
}