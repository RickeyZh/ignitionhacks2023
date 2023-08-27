import { Link } from "react-router-dom";
import Timer from "../Components/Time-Calculator";
import Particles from "../Components/Particles";
import StudentA from "../Students/StudentA.jpg";
import StudentB from "../Students/StudentB.png";
import StudentC from "../Students/StudentC.png";
import StudentD from "../Students/StudentD.jpg";
import Emotion from "../Components/Face-Api2";

export default function Teacher() {
    return (
        <div>

            <div className="timerformat">
                <div className="timername">
                    Current Session
                </div>
                <Particles></Particles>
                <Timer className="Timer"></Timer>
            </div>
            

            
            <div className="classroom">
                <Emotion></Emotion>
                <div className = "classroomLabel">
                    Your Class
                </div>
                <img style={{ borderRadius: "10px", width: "500px", height: "500px", border: "10px solid black" }} src={StudentA} ></img>
                <img style={{ borderRadius: "10px", width: "500px", height: "500px", border: "10px solid black" }} src={StudentB} ></img>
                <img style={{ borderRadius: "10px", width: "500px", height: "500px", border: "10px solid black" }} src={StudentC} ></img>
                <img style={{ borderRadius: "10px", width: "500px", height: "500px", border: "10px solid black" }} src={StudentD} ></img>
                {/* Can try adding these images to the face-api2.js file so they ar erendered together*/}
            </div>

        </div>
    )
}