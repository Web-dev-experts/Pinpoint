import { useEffect, useState } from "react";
import styled from "styled-components";

const PointsCount = styled.h2`
  font-size: 35px;
  font-weight: 600;
  letter-spacing: 4px;
  color: #ffffff;
`;

function Counter({ target }) {
  const [intervalTime, setIntervalTime] = useState(1); // Start at 1 second per increment
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }

        if (prev >= target - 60) {
          setIntervalTime((prev) => prev + (count + 1) / 2000);
        }
        if (prev >= target - 3) {
          setIntervalTime(500);
        }

        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [intervalTime, target, count]); // Restart effect if interval changes

  return <PointsCount>{count || "0"} XP</PointsCount>;
}

export default Counter;
