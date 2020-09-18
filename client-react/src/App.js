import React from "react";
import Sidebar from './components/sidebar';
import Home from './screens/Home';
import About from './screens/About';
import Profile from './screens/Profile';
import Tracker from './screens/Tracker';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import {BrowserRouter as Router, Route, } from 'react-router-dom';
import "./App.css";

function App(){

    return(
        <div id="App">
            <Sidebar />
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/tracker" component={Tracker} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={Login} />
                </div>
            </Router>
        </div>
    )
};

export default App;