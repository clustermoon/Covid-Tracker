import React, {useState} from 'react';
import {
    GoogleMap,
    useLoadScript, 
    Marker
} from "@react-google-maps/api";
import mapStyles from '../../mapStyles';


var m_list = new Array([]);
const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
}
const mapCenter = {
    lat: 43.653225,
    lng: -79.383186,
}
const mapOptions = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

function Reload(){
    const [value, setvalue] = useState(0);
    if(value <= 0){
        return () => setvalue(value => ++value);
    }
}

const Profile = ()=>{
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries : ["places"]
    })
    
    var coords = [];




    fetch('/mypost', {
        headers: {
            "Authorization" : "Bearer " + localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        coords = result;
        var index = coords.mypost.length
        var currentList = coords.mypost[index-1];
        var markerList = currentList.markers[0].markers
        m_list = markerList;
        console.log(m_list);
    })

    

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading Maps";

    return(

            <div className="profileRow">
                <div className="profileMap">
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={mapCenter}
                    options={mapOptions}
                    zoom={8}

                >

                    {m_list.map((marker) => (
                        <Marker
                            key={marker}
                            position={{lat: marker.lat, lng: marker.lng }}
                        />
                    ))}

                </GoogleMap>
                </div>
            </div>

    )
}

export default Profile;