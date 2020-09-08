import React from 'react';
import {Link} from "react-router-dom";
import "../styles/Index.css";

class SignUp extends React.Component{ 

    onNavigate(){
        //Push the users sign up info onto the database
    }


    render(){
        return(
            <div>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <div class="container">
                    <h1 class="child">Create Account</h1>
                    <h3 class="child">Please enter the following</h3>
                    <a class="child" href="/login">Already have an account?</a><br/><br/>
                    <form class="sngForm" onSubmit={this.handleSubmit}>
                        <input placeholder="FirstName"></input><br/>
                        <input placeholder="LastName"></input><br/>
                        <input placeholder="UserName"></input><br/>
                        <input placeholder="Password"></input><br/>
                        <input placeholder="zip"></input><br/><br/>
                        <Link to="/login"><button onClick={this.onNavigate} className="btn btn-primary">Done</button></Link>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp;