import styled from "styled-components";

const StyledOverlay = styled.div`
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(10px);
  background: #ffffff25;
  z-index: 0;
`;

function Overlay() {
  return <StyledOverlay />;
}

export default Overlay;
