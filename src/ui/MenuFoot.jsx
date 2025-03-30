import { Link } from "react-router-dom";
import styled from "styled-components";

const FootContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10%;
`;

const StyledLink = styled.a`
  cursor: pointer;
  font-size: 24px;
  letter-spacing: 3px;
  transition: 0.3s;
  &:hover {
    transform: translateY(-10px);
  }
`;

function MenuFoot() {
  return (
    <FootContainer>
      <StyledLink>Credits</StyledLink>
      <StyledLink>
        <Link to="/play">Start Game</Link>
      </StyledLink>
      <StyledLink>How to play?</StyledLink>
      <StyledLink>Settings</StyledLink>
      <StyledLink>Profile</StyledLink>
      <StyledLink>Exit</StyledLink>
    </FootContainer>
  );
}

export default MenuFoot;
