import React, {useEffect, createContext, useReducer, useContext} from 'react';
import NavBar from './components/navbar';
import "./App.css";
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import Home from './components/screens/Home'
import Profile from './components/screens/Profile';
import About from './components/screens/About';
import Signup from './components/screens/Signup';
import Login from './components/screens/Login';
import Tracker from './components/screens/Tracker';
import {reducer, initialState} from './reducer/userReducer';

export const UserContext = createContext();

const Routing = () =>{
  const history = useHistory()
  const {dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!history.location.pathname.startsWith('/reset'))
           history.push('/login')
    }
  },[])

  return(
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signup">
        <Signup/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/about">
        <About/>
        <NavBar/>
      </Route>
      <Route path="/profile">
        <Profile/>
        <NavBar/>
      </Route>
      <Route path="/tracker" >
        <Tracker/>
        <NavBar/>
      </Route>
    </Switch>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{state, dispatch}} >
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
