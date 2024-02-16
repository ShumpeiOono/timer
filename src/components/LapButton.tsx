import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { ReactNode, useContext } from "react";

import LapsContext from "./LapsContext";
const buttonLap = css`
  border-color: green;
  color: red;
`;
const button = css`
  margin-left: 16px;
  width: 240px;
  height: 48px;
`;

interface Time {
  time: number;
  children: ReactNode;
}
export function LapsButton(props: Time) {
  const { time, children } = props;
  // const [laps, setLaps] = useState<number[]>([]);

  const [laps, setLaps] = useContext(LapsContext)!;

  const handleLap = () => {
    setLaps([...laps, time]);
  };
  console.log(laps);
  return (
    <div>
      <Button css={[buttonLap, button]} onClick={handleLap} variant="outlined">
        Lap
      </Button>
      {children}
    </div>
  );
}
