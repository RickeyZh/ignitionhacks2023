import { Link } from "react-router-dom";
import Particles from "../Components/Particles";
import Typewriter from "../Components/TypingFont";
import "../App.css";

export default function Home() {
  return (
  
    <div>
        <Particles />
        <h1 className="title-font">
      Welcome to  
        </h1>
        <h1 className="title-font-second">
     <Typewriter text="EduLink" delay={300} infinite />
        </h1>
      
        
    </div>
    
  )
}

