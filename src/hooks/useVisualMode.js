import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const transition = (transition) => {
    setMode(transition);
  };

  return { mode, transition };
}
