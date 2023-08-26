import { Link } from "react-router-dom";
import Particles from "../Components/Particles";
import Typewriter from "../Components/TypingFont";
import "../App.css";

export default function Home() {
  return (
    
    <div>
        <Particles />
        <center>
        <h1>
        Welcome to <Typewriter text="OUR WEBSITE" delay={250} infinite />
        </h1>
        </center>
        
    </div>
    
  )
}

