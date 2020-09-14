import React from 'react';
import {
    GoogleMap,
    Marker,
    useLoadScript,
    InfoWindow
} from "@react-google-maps/api";
import mapStyles from '../mapStyles';
import { formatRelative } from "date-fns";
import usePlacesAutocomplete, {
    getGeocode,
    getLanLng,
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
//import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {Link} from "react-router-dom";
//-----------------------------------------------------------------------

const libraries = ["places"]
const mapContainerStyle = {
    width: '80vw',
    height: '88vh',
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

function currentMarker(markers) {
    return markers.current;
}

//-----------------------------------------------------------------------
export default function Tracker(){
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    //Control the markers state
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    //Call back function to stop rerenders
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);
    //Unique id for markers
    const index = markers.length;

    //pan to current selection
    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    }, []);

    //Load error catches
    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return (
            <div class="row">
                <div class="otherMenu">
                    <br/><ul class="sidemenuPlaceholder">
                            <li><h2>Menu</h2></li>
                            <Link to="/profile"><li>Profile</li></Link>
                            <Link to="/tracker"><li>Tracker</li></Link>
                            <Link to="/"><li>Sign out</li></Link>
                            <br/><br/><br/><br/><br/><br/>
                            <h3>Click on the locations you have visited in the past 2 weeks</h3>
                            <br/>
                            <p>Try and include all locations you've visited, to help better organize the data</p>
                            <br/><br/><br/><br/><br/><br/>
                            <h4>Made by Team-Jango</h4>
                            <div class="teamMembers">
                                <img src="img_david.jpg"></img>
                                <img src="img_micheal.png"></img>
                            </div>
                            <p>David ---------- Micheal</p>
                            <p>our contact info</p>
                    </ul>
                </div>
                <div class="mainMenu column col-md">
                    <div class="mapContainer">
                        <GoogleMap 
                            mapContainerStyle={mapContainerStyle}
                            zoom={8}
                            center={mapCenter}
                            options={mapOptions}
                            onClick={(event)=>{
                                console.log(markers);
                                setSelected(null);
                                setMarkers(current => [...current, {
                                    lat: event.latLng.lat(),
                                    lng: event.latLng.lng(),
                                    id: index,
                                }
                                ])
                            }}
                            onLoad={onMapLoad}
                        >

                            {markers.map((marker) => (
                                <Marker
                                    key={marker.id}
                                    position={{lat: marker.lat, lng: marker.lng }}
                                    onClick={() => {
                                        setSelected(marker);
                                    }}
                                />
                            ))}

                            {selected ? (
                                <InfoWindow 
                                    position={{ lat: selected.lat, lng: selected.lng }} 
                                    onColoseClick={()=> {
                                        setSelected(null);
                                    }}  
                                >
                                    <div>
                                        <p>location of selected marker</p>
                                    </div>
                                </InfoWindow>
                            ) : null}

                        </GoogleMap>
                        <Search panTo={ panTo } />
                        <Locate panTo={ panTo } />
                    </div>
                    <div class="bottomMenu">
                        <br/><br/><h1>TEST</h1>
                    </div>
                </div>
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
                        console.log(position);
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
            location: {lat: () => 43, lng: () => -79 },
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
            <ComboboxPopover>
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