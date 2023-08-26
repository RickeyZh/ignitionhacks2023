import { Link } from "react-router-dom";
import Particles from "../Components/Particles";
import Typewriter from "../Components/TypingFont";
import "../App.css";
export default function Home() {
  return (
    
    <div>
        <Particles />
        <h1>
        Welcome to <Typewriter text="OUR WEBSITE" delay={100} infinite />
      </h1>
    </div>
    
  )
}

