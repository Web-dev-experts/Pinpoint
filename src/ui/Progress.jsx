import { useEffect, useState } from "react";
import styled from "styled-components";

const PointsProgress = styled.div`
  width: ${(props) => props.$point / 20}%;
  height: 100%;
  border-radius: 5px;
  transition: width 0.2s ease-out;
  -webkit-transition: width 0.2s ease-out;
  -moz-transition: width 0.2s ease-out;
  -o-transition: width 0.2s ease-out;
  background-color: ${(props) =>
    props.$point * 20 < 200
      ? "#D96161"
      : props.$point >= 200 && props.$point < 500
      ? "#D98F61"
      : props.$point >= 500 && props.$point < 800
      ? "#61D961"
      : props.$point >= 800 && props.$point < 1500
      ? "#6191D9"
      : "#9D61D9"};
`;

const PointsProgressCont = styled.div`
  width: 80%;
  height: 10px;
  border-radius: 5px;
  background-color: #ffffff;
`;

function Progress({ target }) {
  const [points, setPoints] = useState(0);
  const [speed] = useState(3); // Initial speed: 100ms per update

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prev) => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }

        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [speed, target]);
  return (
    <PointsProgressCont>
      <PointsProgress $point={points}></PointsProgress>
    </PointsProgressCont>
  );
}

export default Progress;
