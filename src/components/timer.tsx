import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { useRef, useState } from "react";

import { LapsButton } from "./LapButton";
import LapsContext from "./LapsContext";
import { LapsTime } from "./LapsTime";

const buttonReset = css`
  border-color: red;
  color: red;
`;
const buttonStart = css`
  border-color: blue;
  color: blue;
`;
const button = css`
  margin-left: 16px;
  width: 240px;
  height: 48px;
`;
const timeTranslater = (time: number) => {
  const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
  const hours = `0${Math.floor(time / 3600000)}`.slice(-2);
  return (
    <p>
      {hours}:{minutes}:{seconds}:{milliseconds}
    </p>
  );
};

export function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef(0);
  const handleStart = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  };
  function handlePause() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  }
  function handleReset() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  }
  // const handleLap = () => {
  //   setLaps([...laps, time]);
  // }
  const nowTime = timeTranslater(time);
  // const lapsList = laps.map(lap => timeTranslater(lap))
  // const laps = useContext(LapsContext);
  return (
    <div>
      {nowTime}
      {isRunning ? (
        <Button css={[buttonStart, button]} onClick={handlePause} variant="outlined">
          Pause
        </Button>
      ) : (
        <Button css={[buttonStart, button]} onClick={handleStart} variant="outlined">
          Start
        </Button>
      )}
      <Button css={[buttonReset, button]} onClick={handleReset} variant="outlined">
        Reset
      </Button>
      {/* <Button css={[buttonReset, button]} onClick={handleLap} variant="outlined">
          Lap
        </Button>
        {lapsList} */}

      <LapsContext.Provider value={[laps, setLaps]}>
        <LapsButton time={time}>
          <LapsTime />
        </LapsButton>
      </LapsContext.Provider>
    </div>
  );
}
