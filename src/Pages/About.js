import { Link } from "react-router-dom";
import Particles from "../Components/Particles";
export default function About() {
    return (
        <div>
            <Particles />
            <p className></p>
            <h1 className="smalllogo1">Edu</h1>
            <h1 className="smalllogo2">Link</h1>
            <p className="desctext">
                <p></p>
            EduLink is a user-friendly website that improves the everyday lives of teachers and students. 
            With the use of artificial intelligence and face recognition API,
             EduLink allows teachers to gauge how students are feeling by 
             providing them with a summary of how the audience's emotions.
             This solves the problem of online learning/presenting, 
             where at times it is hard to measure an especially large audience’s attention. 
            </p>
        </div>
    )
}