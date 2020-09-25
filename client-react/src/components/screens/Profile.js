import React, {useState, useEffect} from 'react';


const Profile = ()=>{
    const [data, setData] = useState([]);
    fetch('/allpost', {
        headers: {
            "Authorization" : "Bearer " + localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        //setData(result);
    })


    return(
        <div className="oContainer">
            <h1 className="child pTag">Welcome</h1>
            {
                data.map(item=>{
                    return(
                        <div>
                            {item.markerPositions}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Profile;