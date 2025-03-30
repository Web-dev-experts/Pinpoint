import styled from "styled-components";

const StyledMenuNav = styled.div`
  width: 80%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 17%;
`;

function MenuNav() {
  return (
    <StyledMenuNav>
      <Img src="../../Logo-All.png" alt="" />
    </StyledMenuNav>
  );
}

export default MenuNav;
