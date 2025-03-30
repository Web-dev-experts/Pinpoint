import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import Pin from "../../../../Pin.png";
import { GameContext } from "../../../pages/Game";

export const StyledMap = styled.div`
  cursor: pointer;
  width: 20%;
  height: 25%;
  position: absolute !important;
  bottom: 20px;
  right: 20px;
  transition: 0.3s;
  overflow: hidden;
  z-index: 2;
`;

function Map() {
  // Get map
  const mapRef = useRef();
  const markerRef = useRef();
  const { setUserGuess, isPlaying } = useContext(GameContext);
  useEffect(() => {
    if (!mapRef.current && !document.getElementById("map")._leaflet_id) {
      mapRef.current = window.L.map("map").setView([52, 48], 2);

      window.L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {}
      ).addTo(mapRef.current);
      window.L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
        {}
      ).addTo(mapRef.current);
    }

    return () => {
      if (!isPlaying && mapRef.current) {
        mapRef.current.off(); // Remove all event listeners
        mapRef.current.remove(); // Destroy the map instance
        mapRef.current = null;
      }
    };
  }, [isPlaying]);
  useEffect(() => {
    const myIcon = window.L.icon({
      iconSize: [64, 64],
      iconAnchor: [32, 64],
      iconUrl: Pin,
    });

    const handleClick = (e) => {
      if (markerRef.current) {
        mapRef.current.removeLayer(markerRef.current);
      }

      setUserGuess((prev) => ({
        ...prev,
        position: { lat: e.latlng.lat, lng: e.latlng.lng },
      }));

      markerRef.current = window.L.marker([e.latlng.lat, e.latlng.lng], {
        icon: myIcon,
      }).addTo(mapRef.current);

      mapRef.current.setView([e.latlng.lat, e.latlng.lng], 5);
    };

    if (mapRef.current) {
      mapRef.current.off("click", handleClick);
      mapRef.current.on("click", handleClick);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off("click", handleClick);
      }
    };
  });

  const handleMouseEnter = () => {
    document.getElementById("map").style.width = "45%";
    document.getElementById("map").style.height = "55%";
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 300);
  };
  const handleMouseLeave = () => {
    document.getElementById("map").style.width = "20%";
    document.getElementById("map").style.height = "25%";
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 300);
  };

  return (
    <>
      {
        <StyledMap
          id="map"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></StyledMap>
      }
    </>
  );
}

export default Map;
