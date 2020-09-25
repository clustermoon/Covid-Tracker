import React from 'react';


const About = ()=>{
    return(
        <div>
        <div className="oContainer">
                <h1 className="child pTag">About</h1>
                <h3 className="child pTag" >Covid-Tracker</h3>
                <p className="child pTag" >
                    Covid-Tracker was made for a group project at Woz-U.
                    It's purpose is to help track the locations of places you,
                    or loved ones have visited that have been exposed.
                </p>
                <br></br>
                <p className="child pTag" >Development of this project took 6 weeks, and was made by 2 students enrolled at Woz-U</p>

                <br></br><br></br><br></br>

                <h3 className="child pTag">Team Jango</h3>
                <div className="pTag">
                    <img className="teamImg" src="img_david.jpg" ></img>
                    <img className="teamImg" src="img_micheal.png" ></img>
                </div>
                <p className="child pTag" >David Wommack -&- Micheal Brady</p>
                <div className="iContainer" >
                    <p className="child lefty" >
                         Clustermoon@gmail.com<br></br>
                         <a>https://www.linkedin.com/in/david-wommack-68a4aa16b/</a><br></br>
                         <a>https://github.com/clustermoon</a><br></br>
                         <a>https://twitter.com/clustermoon</a><br></br>
                    </p>
                    <p className="child pTag" >
                        PUT YOUR INFO HERE
                    </p>
                </div>

        </div>
        <div className="bg"></div>
    </div>
    )
}

export default About;