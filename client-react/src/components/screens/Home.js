import React from 'react';


const Home = ()=>{
    return(
    <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <div class="mContainer">
                <h1 class="child pTag">COVID-Tracker</h1>
                <h2 class="child pTag">Sign up or login for free!</h2><br/>
                <div class="child pTag">
                    <a  href="/signup" class="child sgn"><h4>SignUp</h4></a>
                    <a  href="/login" class="child lgn"><h4>Login</h4></a>
                </div>
        </div>
    </div>
    )
}

export default Home;