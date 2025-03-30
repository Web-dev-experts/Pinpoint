import styled from "styled-components";

const DistanceText = styled.h2`
  font-size: 40px;
  font-weight: 600;
`;

const StyledDistance = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

function Distance({ distance }) {
  return (
    <StyledDistance>
      <DistanceText>
        {distance || "0"} <br /> KM
      </DistanceText>
    </StyledDistance>
  );
}

export default Distance;
