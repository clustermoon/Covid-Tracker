import React from "react";
import axios from "axios";
import {
    withScriptjs, 
    withGoogleMap, 
    GoogleMap, 
    Marker, 
    InfoWindow,
    useLoadScript,
  } from '@react-google-maps/api';
  import {formatRelative } from "date-fns";
  import usePlacesAutoComplete, { getGeocode, getLatlng, } from "use-places-autocomplete"
  import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, } from "@reach/combobox";
  import mapStyles from "../mapStyles";


//Constants ------------------------------------------------------------

const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCgWiGsTsAbjy5EikIKTAwbS4VIxE5oBgI",
    libraries,
});
const [selected, setSelected] = React.useState(null);
const mapRef = React.useRef();
const onMapLoad = React.useCallback((map) => {
  mapRef.current = map;
}, []);
const add_marker = React.useCallback((event) => {
    Markers(current => [...current, {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
    },
]);
}, []);

// Main class -----------------------------------------------------

class GMarker extends React.Component {
    constructor(props) {
      super(props);
      this.state = { GMarkers: [] };
      this.user = currentUser;
      this.lat = //
      this.lng = //
      this.markerDate = React.createRef();
    }
   
    
  
    componentDidMount() {
      this.getData();
    }
  
    getData = () => {
      // Java Spring Boot uses port 8080
      //let url = "http://localhost:8080/tasks";
  
      // C# dotnetcore uses port 5000
      //let url = "http://localhost:5000/projects";
  
      // Express uses port 3001 (react uses 3000)
      let url = "http://localhost:3001/Tracker";
      axios.get(url).then(response => this.setState({ tasks: response.data }));
    };

    addMarker = () => {
      let url = "http://localhost:3001/Tracker";

      add_marker();

      axios.post(url, {
        lat: this.lat.current.value,
        lng: this.lng.current.value,
        time: this.markerDate.current.value,
        user: this.user.current.value
      }).then(response => {
        this.getData();

        this.markerDate.current.value = "";
      });
    };



    render() {
      return (
        <div>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                zoom={8} 
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >  
            {markers.map((marker) => (
                <Marker 
                key={marker.time.toISOString()} 
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {
                    setSelected(marker);
                }}
                />
            ))}

            {selected ? (removeMarker()) : null}
                
            </GoogleMap>
        </div>
      );
    }
}

if (loadError) return "Error loading maps";
if (!isLoaded) return "Loading Maps";

export default GMarker;