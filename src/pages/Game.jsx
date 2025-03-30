import { createContext, useEffect, useState } from "react";
import Map from "../features/Game/Map/Map";
import Layout from "../features/Game/Game Layout/Layout";
import Overlay from "../ui/Overlay";
import Button from "../ui/Button";
import Score from "../features/Score/Score";
import PlaceName from "../features/Game/Map/PlaceName";
import Pano from "../features/Game/Pano/Pano";
import styled from "styled-components";

export const GameContext = createContext();

const StyledGuess = styled.button`
  cursor: ${(props) => (props.$GuessExists ? "pointer" : "not-allowed")};
  position: absolute;
  background-color: #000;
  top: 20px;
  left: 20px;
`;

function Game() {
  const [timeLeft, setTimeLeft] = useState(120);
  const [userGuess, setUserGuess] = useState({
    time: null,
    position: {},
  });
  const [userStats, setUserStats] = useState({
    xp: null,
    distance: null,
  });
  const [correctGuess, setCorrectGuess] = useState({ lat: null, lng: null });
  const [isPlaying, setIsPlaying] = useState(true);

  function handleEndGame() {
    setUserGuess((prev) => ({ ...prev, time: timeLeft }));
  }
  useEffect(() => {
    if (userStats.distance !== null) {
      setUserStats((prev) => {
        return {
          ...prev,
          xp:
            prev.distance !== 0
              ? Math.round(
                  (200 * (1 - Math.min(prev.distance / 10000, 1))) /
                    ((Math.sqrt(timeLeft || 1) + 1) / (Math.sqrt(200) + 1))
                )
              : 0,
        };
      });
    }
  }, [userStats.distance]);
  useEffect(() => {
    if (timeLeft === 0 && isPlaying) {
      handleEndGame();
      console.log(correctGuess);
      setIsPlaying(false);
    }
  }, [timeLeft]);

  return (
    <GameContext.Provider
      value={{
        userGuess,
        setUserGuess,
        timeLeft,
        setTimeLeft,
        setIsPlaying,
        isPlaying,
        userStats,
        setUserStats,
        correctGuess,
        setCorrectGuess,
      }}
    >
      <Map />
      <Pano />
      {userGuess.position.lat && userGuess.position.lng && <PlaceName />}
      <StyledGuess
        className="button"
        $GuessExists={
          userGuess.position.lat &&
          userGuess.position.lng &&
          correctGuess.lat &&
          correctGuess.lng
        }
        onClick={() => {
          if (correctGuess.lat && correctGuess.lng) {
            handleEndGame();
            setIsPlaying(false);
          }
        }}
      >
        Guess location
      </StyledGuess>
      <Layout />
      {!isPlaying && (
        <>
          <Overlay />
          <Score />
        </>
      )}
    </GameContext.Provider>
  );
}

export default Game;
