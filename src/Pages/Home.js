import { Link } from "react-router-dom";
import Particles from "../Components/Particles";
import "../App.css";
export default function Home() {
  return (
    <div>
        <Particles />

        <Link to="/student"> Student </Link>
        <p></p>
        <Link to="/teacher"> Teacher </Link>

    </div>
  )
}
