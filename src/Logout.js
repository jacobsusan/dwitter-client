

import React from 'react';


function Logout(){

    sessionStorage.clear()

    return(

        <div className="dweetArea">
            <h3>You are loged out. Click <a href="/dwitter"> here </a> to login</h3> 
            
        </div>

    );
}

export default Logout;