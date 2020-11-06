import { useState } from "react";

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

  //the function sets the mode and the browsing history
   const transition = (mode, replace = false) => { 
     
     setMode(mode);
     //replace value indicates when the history must skip a step
     if (replace && history.length !== 1){
       
        setHistory(prev => ([...prev.slice(0, prev.length -1), mode]))

     } else {
        setHistory(prev => ([...prev, mode]));
     } 
   };

   //the function governs the backwards movements

    const back = () => {
        if (history.length === 1) {
            setMode(initial);
          } 
        if(history.length > 1){
            const thistory = [...history];
            thistory.pop();
            setMode(thistory[thistory.length - 1]);
            setHistory(thistory);
        } 
    };
  
    return { mode, transition, back };
  
  }

 