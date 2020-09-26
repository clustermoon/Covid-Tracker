import React from 'react';


const Home = ()=>{
    return(
    <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <div class="oContainer card auth-card ">
                <h1 class="child pTag">COVID-Tracker</h1>
                <h3 class="child pTag">Sign up or login for free!</h3><br/>
                <div class="child pTag">
                    <a  href="/signup" class="child sgn"><h5>SignUp</h5></a>
                    <a  href="/login" class="child lgn"><h5>Login</h5></a>
                </div>
        </div>
    </div>
    )
}

export default Home;