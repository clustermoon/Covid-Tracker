import React, {useState, useContext, } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from'../../App';
import M from 'materialize-css';

const Login = ()=>{
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    const[password,setPassword] = useState("");
    const[username,setUserName] = useState("");
    const PostData = () =>{
        fetch("/login", {
            method: "post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                password,
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.err){
                M.toast({html: data.error, classes:"#c62828 red darken-3"});
            }else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER", payload:data.user})
                M.toast({html:"signedin successfully", classes:"#81c784 green lighten-2"});
                history.push('/tracker');
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    return(
        <div>
            <div className="oContainer card auth-card input-field">
                <h1 className="child">Login</h1>
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
                    className="btn btn-primary" 
                    type="submit" 
                    name="action"
                    onClick={()=>PostData()}
                >Login</button> 
                <h5 className="child"><Link to="/signup">Don't have an account ?</Link> </h5>
            </div>
        </div>
    )
}

export default Login;