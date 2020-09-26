import React, {useState, useEffect} from 'react';


const Profile = ()=>{
    const [data, setData] = useState([]);
    fetch('/mypost', {
        headers: {
            "Authorization" : "Bearer " + localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        //setData(result.myposts.markerPositions);
    })

    return(
        <div className="oContainer">
            <h1 className="child pTag">Welcome</h1>
            {data.map(item=>{
                return(
                    <div>
                        {item}
                    </div>
                )
            })}

        </div>
    )
}

export default Profile;