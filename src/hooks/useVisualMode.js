import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history] = useState([initial]);


  /**
   * Function to transition between "mode"
   * @param {mode} transition 
   * @param {boolean} replace
   * Store mode history in state.
   */
  
  const transition = (transition, replace = false) => {
    if (replace === false) {
      history.push(mode);
    } 
    setMode(transition);    
  };

  const back = () => {
    if (history.length > 1) {
      setMode(history.pop());
    }
  };

  return { mode, transition, back };
}
