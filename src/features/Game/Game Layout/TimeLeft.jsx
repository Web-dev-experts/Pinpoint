import { useContext, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { GameContext } from "../../../pages/Game";

const linearMove = keyframes`
  0%   { background-position: 50% 50%; }
  25%  { background-position: 500% 25%; }
  50%  { background-position: 1000% 50%; }
  75%  { background-position: 500% 75%; }
  100% { background-position: 50% 50%; }
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 10px;
  width: 15%;
  font-size: 36px;
  font-weight: 600;
  position: absolute;
  border-radius: 100px;
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 100px;
    padding: 5px;
    background: var(--main-gradient);
    background-size: 1000% 100%;
    background-position: 50% 50%;
    transition: 1s ease-in-out;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    animation: ${linearMove} 120s infinite linear;
  }
  color: #000000ab;
  background: none;
`;

function TimeLeft() {
  const { timeLeft, setTimeLeft, setIsPlaying } = useContext(GameContext);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsPlaying(false);
      document.getElementById("map").style.display = "none";
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((c) => c - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);
  return (
    <TimeContainer>
      {Math.floor(timeLeft / 60)} :{" "}
      {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
    </TimeContainer>
  );
}

export default TimeLeft;
