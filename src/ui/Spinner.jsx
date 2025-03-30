import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }

`;

const StyledSpinner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background-color: var(--secondary-color-black);
`;
const SpinnerImage = styled.svg`
  animation: ${rotate} 1s infinite cubic-bezier(0.25, 0, 0.5, 1);
  transition: 1s;
`;

function Spinner() {
  return (
    <StyledSpinner>
      <SpinnerImage
        width="159"
        height="131"
        viewBox="0 0 159 131"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M158.851 74.6418C158.084 62.1019 154.355 49.9226 147.971 39.1022C141.587 28.2818 132.729 19.1285 122.124 12.3926C111.52 5.65667 99.4692 1.53002 86.9613 0.35091C74.4535 -0.828198 61.8443 0.973816 50.1674 5.60922C38.4905 10.2446 28.0784 17.5814 19.7848 27.0182C11.4911 36.4549 5.55204 47.7229 2.45441 59.8983C-0.64323 72.0737 -0.811212 84.81 1.96423 97.0629C4.73967 109.316 10.3795 120.736 18.4214 130.389L25.2795 124.675C18.1405 116.106 13.1339 105.968 10.6701 95.0909C8.20633 84.2138 8.35545 72.9076 11.1053 62.0992C13.8551 51.2909 19.1273 41.2881 26.4897 32.911C33.8522 24.5338 43.0951 18.0208 53.4609 13.9059C63.8267 9.79093 75.0201 8.19125 86.1236 9.23796C97.227 10.2847 107.924 13.948 117.338 19.9276C126.753 25.9071 134.616 34.0327 140.283 43.6382C145.95 53.2436 149.26 64.0554 149.942 75.1873L158.851 74.6418Z"
          fill="url(#paint0_linear_76_2)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_76_2"
            x1="33"
            y1="-1.5"
            x2="88"
            y2="99.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#A82929" />
            <stop offset="0.4" stop-color="#FF0000" />
            <stop offset="0.6" stop-color="#2D78C8" />
            <stop offset="1" stop-color="#348EEF" />
          </linearGradient>
        </defs>
      </SpinnerImage>
    </StyledSpinner>
  );
}

export default Spinner;
