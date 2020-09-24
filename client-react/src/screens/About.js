import React from 'react';


export default function About(){

    return(
        <div>
            <div className="oContainer">
                    <h1 className="child">About</h1>
                    <h3 className="child" >Covid-Tracker</h3>
                    <p className="child pTag" >
                        Covid-Tracker was made for a group project at Woz-U.
                        It's purpose is to help track the locations of places you,
                        or loved ones have visited that have been exposed.
                    </p>
                    <br></br>
                    <p className="child pTag" >Development of this project took 6 weeks, and was made by 2 students enrolled at Woz-U</p>

                    <br></br><br></br><br></br>

                    <h3 className="child">Team Jango</h3>
                    <div className="pTag">
                        <img className="teamImg" src="img_david.jpg" ></img>
                        <img className="teamImg" src="img_micheal.png" ></img>
                    </div>
                    <p className="child" >David Wommack -&- Micheal Brady</p>
                    <div className="iContainer" >
                        <p className="child lefty" >
                             Clustermoon@gmail.com<br></br>
                             <a>https://www.linkedin.com/in/david-wommack-68a4aa16b/</a><br></br>
                             <a>https://github.com/clustermoon</a><br></br>
                             <a>https://twitter.com/clustermoon</a><br></br>
                        </p>
                        <p className="child" >
                            asdasda
                        </p>
                    </div>

            </div>
            <div className="bg"></div>
        </div>
    )

};