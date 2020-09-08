import React from 'react';
import ReactDOM from 'react-dom';
import Home from './screens/Home';
import About from './screens/About';
import Profile from './screens/Profile';
import Tracker from './screens/Tracker';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';


const App = () => (
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
);


ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
