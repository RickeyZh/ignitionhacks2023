import { Link } from "react-router-dom";
import Particles from "../Components/Particles";
import Typewriter from "../Components/TypingFont";
import "../App.css";
import "../buttons.scss";
//type
import ReactTyped from "react-typed";

export default function Home() {
  return (
    <div>
      <Particles />
      <h1 className="title-font">Welcome to</h1>
      <h1 className="title-font-second">Edu</h1>
      <h1 className="title-font-third">Link</h1>
      <h1 className="desc">
        {" "}
        <ReactTyped
          strings={[
            "Keeping Teachers Emotionally in Tune with Students",
            "Check our the About page for more info",
          ]}
          typeSpeed={20}
          loop
          backSpeed={20}
          cursorChar=">"
          showCursor={true}
        />
      </h1>
      <a class="btn-1" href="#">
        Students
      </a>
      <a class="btn-1" href="#">
        Teachers
      </a>
    </div>
  );
}
