import React from 'react';
import "../styles/Index.css";

class Login extends React.Component {

    onNavigate(){
        /*if(user == currentUser){
            Push login info to be validated
            if(encrepted key == databasekey){
                <Redirect to="/Tracker"/>
            }
        }*/
    }


    render(){
        return(
            <div>
                <div class="oContainer">
                    <h1 class="child">Login</h1>
                    <form class="sngForm" onSubmit={this.onNavigate}>
                    <label class="child" for="usrName">User Name:</label>
                    <input class="child usrName" placeholder="user name"></input>
                    <label class="child" for="pwd">Password:</label>
                    <input class="child pwd" placeholder="password"></input><br/>
                    <button onClick={this.onNavigate} className="btn btn-primary">Submit</button> 
                    </form>
                    <br/><a class="admnBttn" href="/tracker">Admin Acess</a>
                </div>
                <div class="bg"/>
            </div>
        )
    }
}

export default Login;