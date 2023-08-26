import Emotion from "../Components/Face-Api";
import VerticalProgress from "../Components/Vertical-Progress";
export default function Student() {
    return (
        <div>
            <Emotion />
            <VerticalProgress progress={19} />
            {/*
            NEUTRAL {emotionValues[0]}
            <br/>
            HAPPY {emotionValues[1]}
            <br/>
            SAD {emotionValues[2]}
            <br/>
            ANGRY {emotionValues[3]}
            <br/>
            FEARFUL {emotionValues[4]}
            {emotionValues[5]}
            */}
            {/*
                ALSO SHOUILD PROB ROUND THE ARRRAY VALUES OFF IN THE face-api.js FILE

            */}
        </div>
    )
}