import Emotion from "../Components/Face-Api";
import VerticalProgress from "../Components/Vertical-Progress";
export default function Student() {
    return (
        <div>
            <Emotion />
            
            <VerticalProgress progress={19} />
            

            {/*
                ALSO SHOUILD PROB ROUND THE ARRRAY VALUES OFF IN THE face-api.js FILE

            */}
        </div>
    )
}