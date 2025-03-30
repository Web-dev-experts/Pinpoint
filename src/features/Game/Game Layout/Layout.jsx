import styled from "styled-components";
import TimeLeft from "./TimeLeft";

const StyledLayout = styled.div`
  display: flex;
  justify-content: center;
  padding: 45px;
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
`;

function Layout() {
  return (
    <StyledLayout>
      <TimeLeft>1 : 59</TimeLeft>
    </StyledLayout>
  );
}

export default Layout;
