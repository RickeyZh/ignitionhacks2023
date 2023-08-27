import { expressionStatement } from "@babel/types";
import * as faceapi from "face-api.js";
import React, { useState, useEffect } from "react";
import "../buttons.scss";
// NOTE: TRY TO USE THE REACT CAMERA THINGY
// For multiple people maybe try to

function Emotion() {
  /*BELOW IS ADDED*/
  const [emotionValues, setEmotionValues] = useState({
    neutral: 0,
    happy: 0,
    sad: 0,
    angry: 0,
    fearful: 0,
  });
  const [neutralVal, setNeutralVal] = useState(0);
  const [happyVal, setHappyVal] = useState(0);
  const [sadVal, setSadVal] = useState(0);
  const [angryVal, setAngryVal] = useState(0);
  const [fearfulVal, setFearfulVal] = useState(0);
  // Try to make above thing into array later
  const [currentTotal, setcurrentTotal] = useState(0);
  const [emotionPercentageCurrent, setEmotionPercentageCurrent] = useState({
    neutral: 0,
    happy: 0,
    sad: 0,
    angry: 0,
    fearful: 0,
  });
  const [overallTotal, setOverallTotal] = useState(0);
  const [emotionPercentageOverall, setEmotionPercentageOverall] = useState({
    neutral: 0,
    happy: 0,
    sad: 0,
    angry: 0,
    fearful: 0,
  });

  const [filled, setFilled] = useState(0);
  const [filled2, setFilled2] = useState(0);
  const [filled3, setFilled3] = useState(0);
  const [filled4, setFilled4] = useState(0);
  const [filled5, setFilled5] = useState(0);

  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);

  const videoRef = React.useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = React.useRef();

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvas(videoRef);
        // canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        //   videoRef.current
        // );
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        /*Edits here*/
        detections.forEach((detection) => {
          const expressions = detection.expressions;
          setEmotionValues({
            neutral: expressions.neutral,
            happy: expressions.happy,
            sad: expressions.sad,
            angry: expressions.angry,
            fearful: expressions.fearful,
          });
          setNeutralVal((neutralVal) => neutralVal + expressions.neutral);
          setHappyVal((happyVal) => happyVal + expressions.happy);
          setSadVal((sadVal) => sadVal + expressions.sad);
          setAngryVal((angryVal) => angryVal + expressions.angry);
          setFearfulVal((fearfulVal) => fearfulVal + expressions.fearful);
          setOverallTotal(
            (overallTotal) =>
              overallTotal +
              expressions.neutral +
              expressions.happy +
              expressions.sad +
              expressions.angry +
              expressions.fearful
          );
          setcurrentTotal(
            expressions.neutral +
              expressions.happy +
              expressions.sad +
              expressions.angry +
              expressions.fearful
          );
          setFilled(expressions.neutral);
        });

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        canvasRef &&
          canvasRef.current &&
          canvasRef.current
            .getContext("2d")
            .clearRect(0, 0, videoWidth, videoHeight);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawFaceExpressions(
            canvasRef.current,
            resizedDetections
          );
      }
    }, 100);
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

  // PROGRESS BAR BELOW, NEED TO SET UP 10 OF THEM, CURRENT PERCENTAGES, OVERALL PERCENTAGES, ALSO SORT THEM
  useEffect(() => {
    setFilled(emotionPercentageCurrent.neutral)
    setTimeout(() => 50)
  },[filled])

  useEffect(() => {
    setFilled2(emotionPercentageCurrent.happy)
    setTimeout(() => 50)
  },[filled2])

  useEffect(() => {
    setFilled3(emotionPercentageCurrent.sad)
    setTimeout(() => 50)
  },[filled3])

  useEffect(() => {
    setFilled4(emotionPercentageCurrent.angry)
    setTimeout(() => 50)
  },[filled4])

  useEffect(() => {
    setFilled5(emotionPercentageCurrent.fearful)
    setTimeout(() => 50)
  },[filled5])

  useEffect(() => {
    setEmotionPercentageCurrent({
      neutral: (emotionValues.neutral / currentTotal) * 100,
      happy: (emotionValues.happy / currentTotal) * 100,
      sad: (emotionValues.sad / currentTotal) * 100,
      angry: (emotionValues.angry / currentTotal) * 100,
      fearful: (emotionValues.fearful / currentTotal) * 100,
    })
    setTimeout(() => 50)
  });

  useEffect(() => {
    setEmotionPercentageOverall({
      neutral: (neutralVal / overallTotal) * 100,
      happy: (happyVal / overallTotal) * 100,
      sad: (sadVal / overallTotal) * 100,
      angry: (angryVal / overallTotal) * 100,
      fearful: (fearfulVal / overallTotal) * 100,
    })
    setTimeout(() => 50)
  });

  return (
    <div>
      <div style={{ textAlign: "center", padding: "10px" }}>
        {captureVideo && modelsLoaded ? (
          <a onClick={closeWebcam} class="btn-1">
            Close Webcam
          </a>
        ) : (
          <a onClick={startVideo} class="btn-1">
            Open Webcam
          </a>
        )}
      </div>
      {captureVideo ? (
        modelsLoaded ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <video
                ref={videoRef}
                height={videoHeight}
                width={videoWidth}
                onPlay={handleVideoOnPlay}
                style={{ borderRadius: "10px" }}
              />
              <canvas ref={canvasRef} style={{ position: "absolute" }} />
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )
      ) : (
        <></>
      )}

      <div>
        PERCENTAGES
        <br />
        <br />
        NEUTRAL {Math.floor(emotionPercentageCurrent.neutral)} %
        <br />
        HAPPY {Math.floor(emotionPercentageCurrent.happy)} %
        <br />
        SAD {Math.floor(emotionPercentageCurrent.sad)} %
        <br />
        ANGRY {Math.floor(emotionPercentageCurrent.angry)} %
        <br />
        FEARFUL {Math.floor(emotionPercentageCurrent.fearful)} %
      </div>
      
      <div className='progressbars'>
        <div className="progressbar"> {/*neutral, current percentage*/}
                <div style={{
                    height: "100%",
                    width: `${filled}%`,
                    backgroundColor: "#a66cff",
                    transition:"width 0.5s"
                }}></div>

                <span className="progressPercent">{ filled }%</span>
            </div>

            <div className="progressbar"> {/*happy, current percentage*/}
                <div style={{
                    height: "100%",
                    width: `${filled2}%`,
                    backgroundColor: "#a66cff",
                    transition:"width 0.5s"
                }}></div>

                <span className="progressPercent">{ filled2 }%</span>
            </div>

            <div className="progressbar"> {/*sad, current percentage*/}
                <div style={{
                    height: "100%",
                    width: `${filled3}%`,
                    backgroundColor: "#a66cff",
                    transition:"width 0.5s"
                }}></div>

                <span className="progressPercent">{ filled3 }%</span>
            </div>

            <div className="progressbar"> {/*angry, current percentage*/}
                <div style={{
                    height: "100%",
                    width: `${filled4}%`,
                    backgroundColor: "#a66cff",
                    transition:"width 0.5s"
                }}></div>

                <span className="progressPercent">{ filled4 }%</span>
            </div>

            <div className="progressbar"> {/*fearful, current percentage*/}
                <div style={{
                    height: "100%",
                    width: `${filled5}%`,
                    backgroundColor: "#a66cff",
                    transition:"width 0.5s"
                }}></div>

                <span className="progressPercent">{ filled5 }%</span>
            </div>
        </div>
    </div>
  );
}
export default Emotion;