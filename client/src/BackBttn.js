import { useEffect, useState } from "react";


export default function useBackButton() {

    const [isBack, setIsBack] = useState(false);

    const handleEvent = () => {
        console.log("im here")
      setIsBack(true);
    };
  
    useEffect(() => {
      window.addEventListener("popstate", handleEvent);
      // return () => window.removeEventListener("popstate", handleEvent);
    });
  
    return isBack;
  };