import styled from "styled-components";

const StyledError = styled.div`
  color: #fff;
  z-index: 999;
  background: linear-gradient(to bottom, #120220, #000000);
  font-size: 36px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
  width: 70%;
  position: absolute;
  top: 20%;
  left: 16%;
  padding: 100px;
  border-radius: 25px;
`;

function Error({ children }) {
  return (
    <StyledError>
      <svg
        width="180"
        height="180"
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.1199 131.5L90 7L161.88 131.5H18.1199Z"
          stroke="#CE2B2B"
          strokeWidth="7"
        />
        <path
          d="M94 46.1818L93.3182 96.3636H85.4091L84.7273 46.1818H94ZM89.3636 116.545C87.6818 116.545 86.2386 115.943 85.0341 114.739C83.8295 113.534 83.2273 112.091 83.2273 110.409C83.2273 108.727 83.8295 107.284 85.0341 106.08C86.2386 104.875 87.6818 104.273 89.3636 104.273C91.0455 104.273 92.4886 104.875 93.6932 106.08C94.8977 107.284 95.5 108.727 95.5 110.409C95.5 111.523 95.2159 112.545 94.6477 113.477C94.1023 114.409 93.3636 115.159 92.4318 115.727C91.5227 116.273 90.5 116.545 89.3636 116.545Z"
          fill="#CE2B2B"
        />
      </svg>

      {children}
    </StyledError>
  );
}

export default Error;
