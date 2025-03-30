import { Viewer } from "mapillary-js";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useFetching from "../../../Hooks/useFetching";
import { GameContext } from "../../../pages/Game";
import Error from "../../../ui/Error";

const MAPILLARY_TOKEN = "MLY|9289312644451279|5a5079127e4716c99f08b037749a84b2";

const StyledPano = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 0;
`;

function Pano() {
  const { setCorrectGuess } = useContext(GameContext);

  const containerRef = useRef(null);

  const { data, errors } = useFetching("/images.json");

  const [imageID, setImageID] = useState("");

  useEffect(() => {
    if (!data) return;
    const randomImage = Math.floor(Math.random() * data.length);
    console.log(data[randomImage]);

    setCorrectGuess(() => {
      console.log(data[randomImage]);
      return {
        lat: data[randomImage].geometry.coordinates[1],
        lng: data[randomImage].geometry.coordinates[0],
      };
    });

    console.log(data[randomImage]);
    setImageID(() => {
      console.log(data[randomImage]);
      return data[randomImage].id;
    });
  }, [data]);
  useEffect(() => {
    if (!imageID) return;
    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.height = "100vh";
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    document.getElementById("mly-container").appendChild(container);
    console.log(imageID);
    const viewer = new Viewer({
      accessToken: MAPILLARY_TOKEN,
      container,
      imageId: imageID,
    });

    viewer.on("loaded", () => {
      const startButton = document.querySelector(".mapillary-start-button");
      if (startButton) {
        startButton.click(); // Simulate click to start the viewer
      }
    });

    return () => {
      container.remove();
      viewer.remove();
    };
  }, [imageID]);

  return (
    <>
      {errors.length > 0 && <Error>{errors[0].message}</Error>}

      {!errors.length && <StyledPano ref={containerRef} id="mly-container" />}
    </>
  );
}

export default Pano;
