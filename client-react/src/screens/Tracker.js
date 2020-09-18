import React from 'react';
import {
    GoogleMap,
    Marker,
    useLoadScript,
    InfoWindow
} from "@react-google-maps/api";
import mapStyles from '../mapStyles';
//import { formatRelative } from "date-fns";
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
//import {Link} from "react-router-dom";
//-----------------------------------------------------------------------

const libraries = ["places"]
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
            <div className="mContain">
                <div class="bottomMenu">
                    <h3 className="child titleTracker">COVID-TRACKER</h3>
                    <br/><br/><br/><br/>
                    <p className="child">Please click the locations you have visited</p>
                    <p className="child"> in the past 2 weeks. </p>
                    <ul className="markerList">
                        {markers.map(markers => 
                            <li>
                                Marker {markers.id}    
                            </li>
                        )}
                    </ul>
                </div>
                <div class="mainMenu column col-md">
                    <div class="mapContainer">
                        <Search panTo={ panTo } />
                        <Locate panTo={ panTo } />
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

