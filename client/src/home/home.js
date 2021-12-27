import './home.css';
import TypeWriterEffect from 'react-typewriter-effect';
import {
    Link,
  } from "react-router-dom";


export default function Home(){
    return(
    <div className='home_container'>
        <Link to='/search'>
            <div className= 'homeBox'>
                <TypeWriterEffect
                textStyle={{ fontFamily: 'Freestyle Script' }}
                startDelay={100}
                cursorColor="black"
                text="Book and Collect"
                typeSpeed={100}
            />
            </div>
        </Link>
    </div>
    )
}