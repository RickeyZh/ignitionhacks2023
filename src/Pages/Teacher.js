import { Link } from "react-router-dom";
import Timer from "../Components/Time-Calculator";
import Particles from "../Components/Particles";
import App from "../Components/ChatInterface";
export default function Teacher() {
    return (
        <div className="timerformat">
            <App/>
            <div className="timername">
                Current Session
            </div>
            <Particles></Particles>
            <Timer className="Timer"></Timer>
        </div>
    )
}