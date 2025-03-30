import styled from "styled-components";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";

const StyledHero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 82%;
  gap: 50px;
`;

const HeroTextMain = styled.h1`
  font-size: 83px;
  font-weight: 500;
  letter-spacing: 7px;
  text-align: center;
`;

const HeroTextPlaceName = styled.p`
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 4px;
  text-align: center;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38%;
  gap: 50px;
`;
const HeroText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function MenuHero() {
  const navigate = useNavigate();
  function handleClick(path) {
    navigate(`/${path}`);
  }
  return (
    <StyledHero>
      <HeroText>
        <HeroTextMain>
          Start your adventure.
          <br /> Explore the world while playing.
        </HeroTextMain>
        <HeroTextPlaceName>Barcelona, Spain</HeroTextPlaceName>
      </HeroText>
      <ButtonDiv>
        <Button onClick={() => handleClick("play")}>Start Exploring</Button>
        <Button theme="light">How to play</Button>
      </ButtonDiv>
    </StyledHero>
  );
}

export default MenuHero;
