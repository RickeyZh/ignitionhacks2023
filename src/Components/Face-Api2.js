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

  const [message, setMessage] = useState(0); // {CHECK TMAS FOR THIS ONE, TRY TO SAY }

  const [filled, setFilled] = useState(0);
  const [filled2, setFilled2] = useState(0);
  const [filled3, setFilled3] = useState(0);
  const [filled4, setFilled4] = useState(0);
  const [filled5, setFilled5] = useState(0);

  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);

  const videoRef = React.useRef();
  const videoHeight = 500;
  const videoWidth = 500;
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
    setFilled(emotionPercentageOverall.neutral)
    setTimeout(() => 50)
  },[filled])

  useEffect(() => {
    setFilled2(emotionPercentageOverall.happy)
    setTimeout(() => 50)
  },[filled2])

  useEffect(() => {
    setFilled3(emotionPercentageOverall.sad)
    setTimeout(() => 50)
  },[filled3])

  useEffect(() => {
    setFilled4(emotionPercentageOverall.angry)
    setTimeout(() => 50)
  },[filled4])

  useEffect(() => {
    setFilled5(emotionPercentageOverall.fearful)
    setTimeout(() => 50)
  },[filled5])

  useEffect(() => {
    setEmotionPercentageCurrent({
      neutral: Math.floor((emotionValues.neutral / currentTotal) * 1000)/10,
      happy: Math.floor((emotionValues.happy / currentTotal) * 1000)/10,
      sad: Math.floor((emotionValues.sad / currentTotal) * 1000)/10,
      angry: Math.floor((emotionValues.angry / currentTotal) * 1000)/10,
      fearful: Math.floor((emotionValues.fearful / currentTotal) * 1000)/10,
    })
    setTimeout(() => 50)
  });

  useEffect(() => {
    setEmotionPercentageOverall({
      neutral: Math.floor((neutralVal / overallTotal) * 1000)/10,
      happy: Math.floor((happyVal / overallTotal) * 1000)/10,
      sad: Math.floor((sadVal / overallTotal) * 1000)/10,
      angry: Math.floor((angryVal / overallTotal) * 1000)/10,
      fearful: Math.floor((fearfulVal / overallTotal) * 1000)/10,
    })
    setTimeout(() => 50)
  });

  return (
    <div>
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

      <div className="api2Title">
        OVERALL EMOTIONS
        <br/>
      </div>
      <br/>
      <br/>
      <br/>
      <div className='progressbars'>
        Boredness
        <div className="progressbar" > {/*neutral, current percentage*/}
                <div style={{
                    height: "100%",
                    width: `${filled}%`,
                    backgroundColor: "#a66cff",
                    transition:"width 0.5s"
                }}></div>

                <span className="progressPercent">{ filled }%</span>
            </div>
            Happy {emotionPercentageOverall.happy}%
            <br/>
            Sad {emotionPercentageOverall.sad}%
            <br/>
            Angry {emotionPercentageOverall.angry}%
            <br/>

            Fearful {emotionPercentageOverall.fearful}%

        </div>
    </div>
  );
}
export default Emotion;