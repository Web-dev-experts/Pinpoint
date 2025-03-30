import styled, { keyframes } from "styled-components";
import MenuNav from "../ui/MenuNav";
import MenuHero from "../ui/MenuHero";
import MenuFoot from "../ui/MenuFoot";

export const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 1000% 50%; }
`;
const StyledMenu = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("../../MenuBg.png");
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px; /* Border thickness */
    background: var(--main-gradient); /* Gradient border */
    border-radius: 0 0 15px 15px; /* Match bottom border radius */
    background-size: 1000% 100%;
    animation: ${gradientMove} 60s linear infinite;
  }
`;

function Menu() {
  return (
    <StyledMenu>
      <MenuNav />

      <MenuHero />

      <MenuFoot />
    </StyledMenu>
  );
}

export default Menu;
