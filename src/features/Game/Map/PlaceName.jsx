import { useContext, useEffect, useState } from "react";
import useFetching from "../../../Hooks/useFetching";
import { GameContext } from "../../../pages/Game";
import styled, { css, keyframes } from "styled-components";
import Error from "../../../ui/Error";

const API_KEY = "d01fd151b1884a2eb34d8f9b7819324c";

const PlaceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: absolute;
  left: 20px;
  bottom: 20px;
  width: 27%;
`;

const rotatePin = keyframes`
  0%{
    transform: rotateY(0deg);
  }
  100%{
    transform: rotateY(360deg);
  }
`;

const Img = styled.img`
  width: 30%;
  transform-origin: center;

  animation: ${(props) =>
    !props.$changed
      ? css`
          ${rotatePin} 0.75s ease-in-out 1
        `
      : "none"};
  transition: 0.75s;
`;

const VerticalRule = styled.hr`
  border: 1px solid #fff;
  border-radius: 900px;
  height: 1px;
  transform-origin: center;
  transform: ${(props) => (!props.$changed ? "scaleY(75)" : "none")};
  transition: 0.75s;
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

function PlaceName() {
  const { userGuess } = useContext(GameContext);
  const [hasChanged, setHasChanged] = useState(false);
  const { data, errors } = useFetching(
    `https://api.opencagedata.com/geocode/v1/json?q=${userGuess.position.lat},${userGuess.position.lng}&key=${API_KEY}
    `
  );

  useEffect(() => {
    console.log(data, errors);
  }, [data, errors]);
  useEffect(() => {
    setHasChanged(true);
    const timer = setTimeout(() => {
      setHasChanged(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [userGuess]);
  return (
    <>
      {errors.length && <Error>{errors[0].message}</Error>}
      {data !== null && !errors.length && (
        <PlaceContainer>
          <Img
            src="../../../../PinBig.png"
            alt="Pin image"
            $changed={hasChanged}
          />
          <VerticalRule $changed={hasChanged} />
          <LocationTextContainer>
            <LocationName>
              {!data.error
                ? data.results[0]?.components?.city || // If city is available
                  data.results[0]?.components?.town ||
                  data.results[0]?.components?.village ||
                  data.results[0]?.components?.municipality ||
                  data.results[0]?.components?.county ||
                  data.results[0]?.components?.body_of_water
                : "Unable to get location"}
              , <br />
              {data.results[0]?.components.country ||
              data.results[0]?.components?.body_of_water
                ? ""
                : "No country found"}
            </LocationName>
            <LocationCoordinates>
              {userGuess.position.lat}, {userGuess.position.lng}
            </LocationCoordinates>
          </LocationTextContainer>
        </PlaceContainer>
      )}
    </>
  );
}

export default PlaceName;
