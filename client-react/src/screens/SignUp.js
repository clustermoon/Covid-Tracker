import React from 'react';
import {Link} from "react-router-dom";
import Axios from "axios";
import "../styles/Index.css";

function SignUp(){ 
    Axios({
        method: "GET",
        url: "http://localhost:3001/",
        header: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        console.log(res.data.message);
    });

        return(
            <div>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <div className="oContainer">
                    <h1 className="child">Create Account</h1>
                    <h3 className="child">Please enter the following</h3>
                    <a className="child" href="/login">Already have an account?</a><br/><br/>
                    <form className="sngForm">
                        <input placeholder="FirstName"></input><br/>
                        <input placeholder="LastName"></input><br/>
                        <input placeholder="UserName"></input><br/>
                        <input placeholder="Password"></input><br/>
                        <input placeholder="zip"></input><br/><br/>
                        <Link to="/login"><button className="btn btn-primary">Done</button></Link>
                    </form>
                </div>
                <div className="bg"/>
            </div>
        )
}

export default SignUp;