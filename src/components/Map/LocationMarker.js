import React from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

function LocationMarker({ center }) {
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound() {
      map.flyTo(center, map.getZoom());
    },
  });

  return (
    <Marker position={center}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default LocationMarker;
