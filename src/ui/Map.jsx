import React, { useEffect, useRef, useState } from "react";
import { Viewer } from "mapillary-js";
import styled, { css, keyframes } from "styled-components";
import pin from "../../Pin.png";
import ReactDOMServer from "react-dom/server";
import Spinner from "./Spinner";
import Score from "./Score";

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const toRad = (x) => (x * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

const rotatePin = keyframes`
  from{
    transform: rotateY(0deg)
  }
  to{
    transform: rotateY(360deg)
  }

`;

const StyledMap = styled.div`
  width: ${(props) => (props.$type === "big" ? "80%" : "300px")};
  height: ${(props) => (props.$type === "big" ? "90%" : "200px")};
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 9999;
  overflow: hidden;
  transition: all 0.3s ease; /* Smooth transition */
`;

const MapillaryContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto; /* ✅ Allow dragging inside Mapillary */
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  pointer-events: none; /* ✅ Allow hover effects */
`;

const LocationClicked = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 99999;
`;

const VerticalRule = styled.hr`
  border: 1px solid #fff;
  border-radius: 900px;
  height: 1px;
  transform-origin: center;

  transform: ${(props) => (!props.changed ? "scaleY(65)" : "none")};
  transition: 1s;
`;

const LocationName = styled.h1`
  font-size: 32px;
  font-weight: 500;
`;

const LocationCoordinates = styled.p`
  font-size: 16px;
  font-weight: 400;
  max-width: 400px;
  text-transform: uppercase;
`;

const LocationTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const GuessButton = styled.button`
  z-index: 10000;
  background-color: #222222;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  position: absolute;
  bottom: 20px;
  right: 20px;
  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const Pin = styled.img`
  transform-origin: center;

  animation: ${(props) =>
    props.changed
      ? css`
          ${rotatePin} 1s ease-in-out 1
        `
      : "none"};
  transition: 1s;
`;

const TimeLeft = styled.div`
  position: absolute;
  top: 50px;
  left: 50;
  border-radius: 50px;
  padding: 20px 10px;
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 15px;
    padding: 5px;
    background: var(--main-gradient);
    background-size: 250% 100%;
    background-position: 50% 50%;
    transition: 1s ease-in-out;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
  }
  background: none;
  font-size: 16px;
  z-index: 9999999;
`;

const clientToken = "MLY|9451657014916259|73d309ead8198ef5f2338e7bf13d470d";

function Gameplay() {
  let countTime = 120;
  const [Guessed, setGuessed] = useState(false);
  const [ImageID, setImageID] = useState("");
  const [mapType, setMapType] = useState("small");
  const [hasChanged, setHasChanged] = useState(false);
  const [pinPosition, setPinPosition] = useState([]);
  const [PinPlaceInfo, setPinPlaceInfo] = useState({});
  const [GeneratedPlaceInfo, setGeneratedPlaceInfo] = useState({});
  const [isloaded, setIsLoaded] = useState(false);
  const [GuessStat, setGuessStat] = useState({});
  const [timeOut, setTimeOut] = useState(countTime === 0);

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapContainerRef = useRef(null);

  // Render Map
  useEffect(() => {
    if (mapRef.current) return; // Prevent re-init

    mapRef.current = window.L.map("map").setView([0, 0], 1);

    // Add OpenStreetMap tiles
    // window.L.TileLayer(

    //     "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}")
    // );
    window.L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {}
    ).addTo(mapRef.current);
    window.L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      {}
    ).addTo(mapRef.current);

    // Define marker icon
    const myCustomIcon = window.L.icon({
      iconUrl: pin,
      iconSize: [32, 32], // Adjust size
      iconAnchor: [16, 32], // Center bottom
      popupAnchor: [0, -32], // Popup above marker
    });

    // Handle map click
    mapRef.current.on("click", (e) => {
      setHasChanged(() => true);
      setPinPosition([e.latlng.lat, e.latlng.lng]);

      // ✅ Remove previous marker if it exists
      if (markerRef.current) {
        mapRef.current.removeLayer(markerRef.current);
      }

      // ✅ Add a new marker at clicked location
      markerRef.current = window.L.marker([e.latlng.lat, e.latlng.lng], {
        icon: myCustomIcon,
      })
        .addTo(mapRef.current)
        .bindPopup(
          `<div class="custom-popup">
            Marker at: ${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}
          </div>`,
          { className: "custom-popup-container" }
        )
        .openPopup();
      setTimeout(() => setHasChanged(false), 1000);
    });
  }, [mapType]);

  // Fetch Pano Place
  useEffect(() => {
    async function fetchPlace() {
      try {
        setIsLoaded(false);
        const res = await fetch("/images.json");
        const data = await res.json();
        const randomNum = Math.round(Math.random() * data.length);
        setImageID(data[randomNum].id);
        setGeneratedPlaceInfo(() => ({
          Position: [
            data[randomNum].geometry.coordinates[0],
            data[randomNum].geometry.coordinates[1],
          ],
        }));
        console.log(data[randomNum].geometry.coordinates);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchPlace();
  }, []);

  // Fetch Pano
  useEffect(() => {
    setIsLoaded(false);
    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.height = "100vh";
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    document.getElementById("mapillary-container").appendChild(container);

    const viewer = new Viewer({
      accessToken: clientToken,
      container,
      imageId: ImageID,
    });
    return () => {
      container.remove();
      viewer.remove(); // If Viewer has a cleanup method
    };
  }, [ImageID]);

  // Reverse GeoCoding
  useEffect(() => {
    async function fetchPinPlace() {
      try {
        const res = await fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${pinPosition[0]}&lon=${pinPosition[1]}&limit=50&appid=4931288c44bc3c963e5ed7df33191645`
        );
        const data = await res.json();
        const resCountry = await fetch(
          `https://restcountries.com/v3.1/alpha/${data[0].country}`
        );
        const dataCountry = await resCountry.json();
        setPinPlaceInfo({
          City: data[0]?.name || "city not found",
          Country: dataCountry[0].name.common || "country not found",
          Position: pinPosition,
        });
      } catch (error) {
        setPinPlaceInfo((place) => ({ ...place, Errors: error }));
      }
    }
    fetchPinPlace();
  }, [pinPosition]);

  //Matrix API for distance between generated place and pin
  useEffect(() => {
    if (
      !pinPosition[0] ||
      !pinPosition[1] ||
      !GeneratedPlaceInfo.Position[0] ||
      !GeneratedPlaceInfo.Position[1]
    )
      return;
    const distance = haversineDistance(
      pinPosition[0],
      pinPosition[1],
      GeneratedPlaceInfo.Position[0],
      GeneratedPlaceInfo.Position[1]
    );
    setGuessStat({
      distance,
      //experienceGained: 10 * Math.log2(1 + distance / countTime)
    });
  }, [pinPosition, GeneratedPlaceInfo]);

  //handlers
  const handleResize = () => {
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize(); // Forces Leaflet to update map size
      }
    }, 1); // Delay to ensure the container resizes first
  };

  const handleMouseEnter = () => {
    setMapType("big");
    setTimeout(() => {
      handleResize();
    }, 400); // Delay to ensure the DOM updates first
  };

  const handleMouseLeave = () => {
    setMapType("small");
    setTimeout(() => {
      handleResize();
    }, 400);
  };

  const handleGuess = () => {
    console.log(GuessStat, countTime);
  };

  return (
    <>
      {!timeOut && (
        <>
          <StyledMap
            id="map"
            ref={mapContainerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            $type={mapType}
          />
          <TimeLeft>1:59</TimeLeft>
          <MapillaryContainer id="mapillary-container" />
          <GuessButton
            className="button"
            onClick={handleGuess}
            disabled={!PinPlaceInfo.Country}
          >
            Guess Location
          </GuessButton>

          <Overlay />
          <LocationClicked>
            <Pin
              changed={hasChanged}
              src="../../Pin.png"
              alt="Pin"
              style={{ width: "100px" }}
            />
            <VerticalRule changed={hasChanged} />
            {!PinPlaceInfo.Errors ? (
              <LocationTextContainer>
                <LocationName>
                  {PinPlaceInfo.City},
                  <br />
                  {PinPlaceInfo.Country}
                </LocationName>
                <LocationCoordinates>
                  {pinPosition[0]}, {pinPosition[1]}
                </LocationCoordinates>
              </LocationTextContainer>
            ) : (
              <h1>{!PinPlaceInfo.Country ? "No country found" : ""}</h1>
            )}
          </LocationClicked>
        </>
      )}
      {Guessed && <Score />}
    </>
  );
}
