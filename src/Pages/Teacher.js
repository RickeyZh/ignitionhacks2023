import { Link } from "react-router-dom";
import Timer from "../Components/Time-Calculator";
import Particles from "../Components/Particles";
import App from "../Components/ChatInterface";
import StudentA from "../Students/StudentA.jpg";
import StudentB from "../Students/StudentB.png";
import StudentC from "../Students/StudentC.png";
import StudentD from "../Students/StudentD.jpg";

export default function Teacher() {
    return (
        <div>
            <div className="timerformat">
                <App/>
                <div className="timername">
                    Current Session
                </div>
                <Particles></Particles>
                <Timer className="Timer"></Timer>
            </div>
            <div className="classroom">
                <img style={{ width: "500px", height: "500px", padding: "10px" }} src={StudentA} ></img>
                <img style={{ width: "500px", height: "500px", padding: "10px" }} src={StudentB} ></img>
                <img style={{ width: "500px", height: "500px", padding: "10px" }} src={StudentC} ></img>
                <img style={{ width: "500px", height: "500px", padding: "10px" }} src={StudentD} ></img>
                {/* ADD THE USER CAMERA ALONG WITH THE BARS AT THE BOTTOM*/}
            </div>
        </div>
    )
}