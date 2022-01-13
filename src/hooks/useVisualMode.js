import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (transition) => {
    history.push(mode);
    setMode(transition);
  };

  const back = () => {
    if (history.length > 1) {
      setMode(history.pop());
    }
  };

  return { mode, transition, back };
}
