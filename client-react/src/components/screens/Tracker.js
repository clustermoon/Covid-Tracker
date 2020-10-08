import React from 'react';
import {useHistory} from 'react-router-dom';
import {
    GoogleMap,
    Marker,
    useLoadScript,
} from "@react-google-maps/api";
import mapStyles from '../../mapStyles';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,

}from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import Geocode from 'react-geocode';
import M from 'materialize-css';

//-----------------------------------------------------------------------

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
Geocode.setLanguage("en");
const libraries = ["places"]
const mapContainerStyle = {
    width: '68vw',
    height: '75vh',
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

//-----------------------------------------------------------------------

export default function Tracker(){
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const history = useHistory();
    const postData = () =>{
        fetch("/tracker", {
            method: "post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                markers,
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3"});
            }else{
                M.toast({html:"Success", classes:"#81c784 green lighten-2"});
                history.push('/profile');
            }
        });
    }

    
    //Control the markers state
    const [markers, setMarkers] = React.useState([]);
    //unique key for arrays
    const index = markers.length;

    //Call back function to stop rerenders
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    //pan to current selection
    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    }, []);

    const getAddress = (event) =>{
        var vLat = event.latLng.lat();
        var vLng = event.latLng.lng();
        Geocode.fromLatLng(vLat, vLng).then(
            response=>{
                const Address = response.results[0].formatted_address
                document.getElementById('addy').innerHTML = Address;
            }
        );
    };

    function deleteMarker(){
        markers.length = 0;
        window.location.reload();

    }

    
    //Load error catches
    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return(
        
        <div className="mContain">
        <div className="bottomMenu">
            <h3 className="child titleTracker">COVID-TRACKER</h3>
            <br/><br/><br/><br/>
            <p className="child">Please click the locations you have visited</p>
            <p className="child"> in the past 2 weeks. </p>
            <ul className="markerList">
                <li id="lI" ></li>
                {markers.map(markers =>
                    <li key={markers.id}>
                        {markers.id} Marker
                    </li>

                )}
                <br/>
                <button className="btn-secondary" type="button" name="redo" onClick={()=> deleteMarker()} >Redo</button>
            </ul>
            <button 
                className="btn btn-primary" 
                type="submit" 
                name="action"
                onClick={()=>postData()}
            >Submit</button> 
        </div>
        <div className="mainMenu">
            <div id="map" className="mapContainer">
                <Search panTo={ panTo } />
                <Locate panTo={ panTo } />
                <GoogleMap 
                    mapContainerStyle={mapContainerStyle}
                    zoom={8}
                    center={mapCenter}
                    options={mapOptions}
                    onClick={(event)=>{
                        getAddress(event); 
                        setMarkers(current => [...current, {
                            lat: event.latLng.lat(),
                            lng: event.latLng.lng(),
                            id: index,
                        },
                        ]);
                        console.log(markers);
                    }}
                    onLoad={onMapLoad}
                >
                    
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={{lat: marker.lat, lng: marker.lng }}
                            onClick={(event)=>{
                                console.log(event)
                            }}
                        />
                    ))}

                </GoogleMap>
            </div>
            <div className="child pTag">
                <h4 id="addy"></h4>    
            </div>
        </div>
        <div className="bg"/>
    </div>
    )
}

//-----------------------------------------------------------------------

function Locate({ panTo }) {
    return(
        <button
            className="locate"
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }}
        >
            <img src="explore.png" alt="compass - locate me" />
        </button>
    )
}


//-----------------------------------------------------------------------

function Search({ panTo }){
    const {
        ready, 
        value, 
        suggestions: {status, data}, 
        setValue, 
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => 43.653225, lng: () => -79.383186 },
            radius: 200 * 1000,
        },
    });

    return( 
    <div className="search">
        <Combobox 
            onSelect={async (address) => {
                setValue(address, false);
                clearSuggestions();

                try{
                    const results = await getGeocode({address});
                    const {lat, lng } = await getLatLng(results[0]);
                    panTo({lat, lng});
                }catch(error){
                    console.log("error!");
                }
            }}
        >
            <ComboboxInput 
                value={value} 
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                disabled={!ready}
                placeholder="Enter an address"
            />
            <ComboboxPopover className="popover">
                <ComboboxList>
                    {status === "OK" && 
                        data.map(({id, description}) => (
                        <ComboboxOption
                            key={id}
                            value={description}
                        />
                    ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    </div>
    )
}

//-----------------------------------------------------------------------

//-----------------------------------------------------------------------