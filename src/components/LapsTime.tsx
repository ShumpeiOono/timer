import { css } from "@emotion/react";
import { useContext } from "react";

import LapsContext from "./LapsContext";
function timeTranslater(time: number, index: number) {
  const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
  const hours = `0${Math.floor(time / 3600000)}`.slice(-2);
  if (index % 2 === 0) {
    const lapStyle = css`
      color: green;
    `;
    return (
      <p css={lapStyle}>
        {hours}:{minutes}:{seconds}:{milliseconds}
      </p>
    );
  } else {
    const lapStyle = css`
      color: blue;
    `;
    return (
      <p css={lapStyle}>
        {hours}:{minutes}:{seconds}:{milliseconds}
      </p>
    );
  }
}

export function LapsTime() {
  const [laps] = useContext(LapsContext)!;
  return (
    <div>
      {laps.map((lap, i) => (i % 2 == 0 ? timeTranslater(lap, i) : timeTranslater(lap, i)))}
    </div>
  );
}
