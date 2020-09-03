import React from 'react';
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

let mapMarkers = [];
const libraries = ["places"];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};
const center = {
  lat: 31.941060,
  lng: 35.906898,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

function Backup() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCgWiGsTsAbjy5EikIKTAwbS4VIxE5oBgI",
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  //Need to store marker info to database
  const onMapClick = React.useCallback((event) => {
    setMarkers(current => [...current, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
      },

    ]);

  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  
  //Remove marker information stored in database
  function removeMarker() {

  }

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return( 
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
export default Backup;
