import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import Counter from "../../ui/Counter";
import Progress from "../../ui/Progress";
import Distance from "../../ui/Distance";
import { GameContext } from "../../pages/Game";
import UserPin from "../../../PinBig.png";
import CorrectPin from "../../../PinCorrect.png";

const StyledStats = styled.div`
  background: linear-gradient(to bottom, #120220, #000000);
  font-size: 36px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 50px;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 999;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => 100 / props.$rounds}%;
  gap: 50px;
`;

const StyledStatsMap = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100vh;
`;

const StatsContainerText = styled.div`
  display: flex;
  padding: 15px;
  font-size: 64px;
  background-image: linear-gradient(to right, #2661a0, #ce2b2b),
    linear-gradient(to right, rgba(0, 0, 0, 0.77), rgba(0, 0, 0, 0.77));
  background-blend-mode: overlay;
  width: 60%;
  position: absolute;
  bottom: 0;
`;

const ScoreContainer = styled.div`
  width: 87%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

function Score() {
  const { userGuess, setUserStats, userStats, correctGuess } =
    useContext(GameContext);

  const userMarkerRef = useRef();
  const correctMarkerRef = useRef();
  const pathRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    const point1 = window.L.latLng(
      userGuess.position.lat || 0,
      userGuess.position.lng || 0
    );
    const point2 = window.L.latLng(correctGuess.lat, correctGuess.lng);
    setUserStats((prev) => ({
      ...prev,
      distance:
        userGuess.position.lat && userGuess.position.lng
          ? Math.round(point1.distanceTo(point2) / 1000)
          : 0,
    }));
  }, [userGuess.position]);
  useEffect(() => {
    if (!mapRef.current && !document.getElementById("mapScore")._leaflet_id) {
      console.log(correctGuess);
      mapRef.current = window.L.map("mapScore", {
        center: [
          (userGuess.position.lat || correctGuess.lat + correctGuess.lat) / 2,
          (userGuess.position.lng || correctGuess.lng + correctGuess.lng) / 2,
        ],
        zoom:
          userStats.distance !== 0
            ? Math.max(2, 14 - Math.log2(userStats.distance) * 1.5) + 1
            : 5,
        dragging: false,
        scrollWheelZoom: true,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        touchZoom: false,
        zoomControl: false,
      });

      window.L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {}
      ).addTo(mapRef.current);
      window.L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
        {}
      ).addTo(mapRef.current);

      if (!correctGuess.lat && !correctGuess.lng) return;

      const userIcon = window.L.icon({
        iconSize: [64, 64],
        iconAnchor: [32, 64],
        iconUrl: UserPin,
      });

      const correctPlace = window.L.icon({
        iconSize: [64, 64],
        iconAnchor: [32, 64],
        iconUrl: CorrectPin,
      });

      if (userMarkerRef.current) {
        mapRef.current.removeLayer(userMarkerRef.current);
        userMarkerRef.current = null;
      }
      if (correctMarkerRef.current) {
        mapRef.current.removeLayer(correctMarkerRef.current);
        correctMarkerRef.current = null;
      }

      if (userGuess.position.lat && userGuess.position.lng) {
        userMarkerRef.current = window.L.marker(
          [userGuess.position.lat, userGuess.position.lng],
          {
            icon: userIcon,
          }
        ).addTo(mapRef.current);
      }
      console.log(correctGuess);
      const latCorrect = correctGuess.lat;
      const lngCorrect = correctGuess.lng;
      console.log(latCorrect);
      correctMarkerRef.current = window.L.marker([latCorrect, lngCorrect], {
        icon: correctPlace,
      }).addTo(mapRef.current);

      if (pathRef.current) {
        mapRef.current.removeLayer(pathRef.current);
        pathRef.current = null;
      }
      console.log(correctGuess);
      if (userGuess.position.lat && userGuess.position.lng) {
        const pathCoordinates = [
          [userGuess.position.lat, userGuess.position.lng],
          [correctGuess.lat, correctGuess.lng],
        ];
        pathRef.current = window.L.polyline(pathCoordinates, {
          color: "#000", // Line color
          weight: 10, // Line thickness
          opacity: 0.8, // Transparency
        }).addTo(mapRef.current);
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off(); // Remove all event listeners
        mapRef.current.remove(); // Destroy the map instance
        mapRef.current = null;
      }
    };
  }, [userGuess.position, userStats, correctGuess]);

  return (
    <StyledStats>
      <StatsContainer $rounds={1}>
        <StyledStatsMap id="mapScore" $rounds={1}></StyledStatsMap>
        {userStats && (
          <StatsContainerText>
            <ScoreContainer>
              <Counter target={userStats.xp} />
              <Progress target={userStats.xp} />
            </ScoreContainer>
            <Distance distance={userStats.distance} />
          </StatsContainerText>
        )}
      </StatsContainer>
    </StyledStats>
  );
}

export default Score;
