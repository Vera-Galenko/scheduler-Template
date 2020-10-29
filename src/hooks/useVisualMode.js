import { useState } from "react";

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

   const transition = (mode, replace = false) => { 
     
    setMode(mode);
     
    if (replace && history.length !== 1){
   
        setHistory(prev => ([...prev.slice(0, prev.length -1)], mode))
 

    } else {
        setHistory(prev => ([...prev, mode]));
   } 
}

    const back = () => {
        if(history.length > 1){
            const thistory = [...history];
            thistory.pop();
            setMode(thistory[thistory.length - 1]);
            setHistory(thistory);
        } 
     }
  
    return { mode, transition, back };
  
  }

 