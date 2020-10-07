import React from 'react';


const Home = ()=>{
    return(
    <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <div className="oContainer card auth-card ">
                <h1 className="child pTag">COVID-Tracker</h1>
                <h3 className="child pTag">Sign up or login for free!</h3><br/>
                <div className="child pTag">
                    <a  href="/signup" className="child sgn"><h5>SignUp</h5></a>
                    <a  href="/login" className="child lgn"><h5>Login</h5></a>
                </div>
        </div>
    </div>
    )
}

export default Home;