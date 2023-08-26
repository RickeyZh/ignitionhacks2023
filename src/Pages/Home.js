import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div>
        <Link to="/student"> Student </Link>

        <p>
            WASSUP
        </p>


        <Link to="/teacher"> Teacher </Link>
    </div>
  )
}
