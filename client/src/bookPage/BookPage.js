import {useEffect, useState, useContext} from 'react';
import { useLocation } from 'react-router-dom';


export default function BookPage(){


    const location = useLocation();
    const {clickedBook} = location.state;

    console.log("book",clickedBook)
                
//     const [finishStatus, setfinishStatus] = useState(false);

//     const onBackButtonEvent = (e) => {
//             console.log("im here")
//             e.preventDefault();
//             if (!finishStatus) {
//                 if (window.confirm("Do you want to go back ?")) {
//                     setfinishStatus(true)
//                     // your logic
                
//                 } else {
//                     window.history.pushState(null, null, window.location.pathname);
//                     setfinishStatus(false)
//                 }
//             }
//     }
        

// useEffect(() => {
//     window.history.pushState(null, null, window.location.pathname);
//     console.log("window.location.pathname",window.location.pathname)
//     window.addEventListener('popstate', onBackButtonEvent);
//     return () => {
//       window.removeEventListener('popstate', onBackButtonEvent);  
//     };
//   }, []);

  return (
      <div>hi</div>
  )
}