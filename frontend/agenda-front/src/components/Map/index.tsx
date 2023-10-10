import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';

const MapComponent = ({ text }: any) => <div>{text}</div>;

export default function SimpleMap() {
    
  const [center, setCenter] = useState({ lat:0, lng: 0 });
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCenter(newCenter);
      });
    }
  }, [zoom]); // Executa uma vez no início

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '400px', width: '100%', marginBottom: '20px', gridColumn: "1/ span 2" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDTZ83UXOT9vEg_qA0iInl9_cLteHrB0rA" }}
        center={center} // Use a propriedade center em vez de defaultCenter
        zoom={zoom}
      >
        <MapComponent
          lat={center!.lat} // Use as coordenadas corretas
          lng={center!.lng} // Use as coordenadas corretas
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}


//AIzaSyDTZ83UXOT9vEg_qA0iInl9_cLteHrB0rA