import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import Dashboard from "../pages/dashBoard";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const token =
  (mapboxgl.accessToken = `pk.eyJ1IjoiZm9sYXJpbmpyIiwiYSI6ImNsZXZ1emg0ajA4ZGYzc3M4Z3lrMHdpc3cifQ.dTSkzQIwZciQ51DtrCdf3w`);

const Mapbox = ({ location, current }) => {
  const lat = location?.lat;
  const lng = location?.lon;

  // eslint-disable-next-line
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [popUpDisplay, setPopupDisplay] = useState(false);
  const [lng2, setLng] = useState(lng);
  const [lat2, setLat] = useState(lat);
  const [zoom, setZoom] = useState(9);

  const setterFunction = () => {
    setPopupDisplay((popUpDisplay) => !popUpDisplay);
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng2, lat2],
      zoom: zoom,
    }); // eslint-disable-next-line

    const marker = new mapboxgl.Marker()
      .setLngLat([lng2, lat2])
      .addTo(map.current);

    //Add icon on the map
    const el = document.createElement("button");
    el.className = "marker";
    el.addEventListener("click", () => {
      setterFunction();
    });
    const newMarker = new mapboxgl.Marker(el)
      .setLngLat([lng2, lat2])
      .addTo(map.current);
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    setPopupDisplay(false);
  }, [location]);

  return (
    <>
      {!popUpDisplay ? (
        <div ref={mapContainer} className="map-container" />
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default Mapbox;
