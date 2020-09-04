import React from "react";
import "../styles/LandingPage.css";

function LandingPage() {
    return(
        <div class="landingContainer">
            <h1>COVID-Tracker</h1>
            <h3>Do you have an account?</h3>
            <div>
                <div class="labels">
                    <h6>Login with your credentials</h6>
                    <h6>Sign Up for free!</h6>
                </div>
                <div class="bttns">
                    <button class="lgn" >Login</button>
                    <button class="sgnUp">SignUp</button>
                </div>
            </div>
        </div>
    );
  }
  
export default LandingPage;