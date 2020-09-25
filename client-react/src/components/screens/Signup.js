import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import M from 'materialize-css';

const Signup = ()=>{
    const history = useHistory();
    const[firstName,setFirstName] = useState("");
    const[lastName,setLastName] = useState("");
    const[password,setPassword] = useState("");
    const[username,setUserName] = useState("");
    const PostData = () =>{
        fetch("/signup", {
            method: "post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                firstName,
                lastName,
                username,
                password,
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.err){
                M.toast({html: data.error, classes:"#c62828 red darken-3"});
            }else{
                M.toast({html:data.message, classes:"#81c784 green lighten-2"});
                history.push('/login');
            }
        }).catch(err=>{
            console.log(err);
        });
    }


    return(
        <div>
        <div className="oContainer card">
            <h1 className="child">Create Account</h1>
            <h3 className="child">Please enter the following</h3>
                <input
                    type="text" 
                    placeholder="FirstName" 
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                 /><br/>
                <input
                    type="text" 
                    placeholder="LastName"
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                 /><br/>
                <input 
                    type="text" 
                    placeholder="UserName"
                    value={username}
                    onChange={(e)=>setUserName(e.target.value)}
                /><br/>
                <input 
                    type="text" 
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                /><br/>
                <button 
                    className="btn waves-effect waves-light"
                    onClick={()=>PostData()}
                >Done</button>
                <h5><Link to="/login">Already have an account ?</Link></h5>
        </div>
        <div className="bg"/>
    </div>
    )
}

export default Signup;