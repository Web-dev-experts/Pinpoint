import styled, { keyframes } from "styled-components";

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const StyledButton = styled.button`
  background-color: ${(props) =>
    props.theme === "dark" ? "#000000" : "#ffffff"};
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#000000")};
  flex: 1;
  cursor: pointer;
  position: relative;
  padding: 15px 20px;
  border: none;
  outline: none;
  font-size: 24px;
  letter-spacing: 3px;
  border-radius: 5px;
  overflow: hidden;
  border-radius: 15px;
  transition: 1s ease-in-out;
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
  &:hover::before {
    background-position: 100% 50%;
  }
`;

function Button({ children, theme = "dark", onClick }) {
  function handleClick() {
    if (onClick) onClick();
    else return null;
  }
  return (
    <StyledButton onClick={handleClick} theme={theme}>
      {children}
    </StyledButton>
  );
}

export default Button;
