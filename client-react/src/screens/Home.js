import React from 'react';
import "../styles/Index.css";

const Home = () => (
    <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <div class="container">
                <h1 class="child">COVID-Tracker</h1>
                <h2 class="child">Sign up or login for free!</h2><br/>
                <div class="child">
                    <a  href="/signup" class="child sgn">Sign up</a>
                    <a  href="/login" class="child lgn">Login</a>
                </div>
        </div>
        <div class="bg"/>
    </div>
);

export default Home;