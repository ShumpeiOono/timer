import { Dispatch, createContext } from "react";

const LapsContext = createContext<[number[], Dispatch<React.SetStateAction<number[]>>] | undefined>(
  undefined,
);

export default LapsContext;
