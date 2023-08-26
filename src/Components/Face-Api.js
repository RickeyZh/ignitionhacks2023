import { expressionStatement } from '@babel/types';
import * as faceapi from 'face-api.js';
import React, { useState, useEffect } from 'react';
// NOTE: TRY TO USE THE REACT CAMERA THINGY
// For multiple people maybe try to 

function Emotion() {

  /*BELOW IS ADDED*/
  const [emotionValues, setEmotionValues] = useState({neutral:0, happy:0, sad:0, angry:0, fearful:0});
  const [neutralVal, setNeutralVal] = useState(0);
  const [happyVal, setHappyVal] = useState(0);
  const [sadVal, setSadVal] = useState(0);
  const [angryVal, setAngryVal] = useState(0);
  const [fearfulVal, setFearfulVal] = useState(0);
  // Try to make above thing into array later
  const [currentTotal, setcurrentTotal] = useState(0);
  const [emotionPercentageCurrent, setEmotionPercentageCurrent] = useState ({neutral:0, happy:0, sad:0, angry:0, fearful:0});
  const [overallTotal, setOverallTotal] = useState(0);
  const [emotionPercentageOverall, setEmotionPercentageOverall] = useState ({neutral:0, happy:0, sad:0, angry:0, fearful:0});

  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);

  const videoRef = React.useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = React.useRef();


  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    }
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  }

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        const displaySize = {
          width: videoWidth,
          height: videoHeight
        }

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

        
        /*Edits here*/
        detections.forEach(detection => {
            const expressions = detection.expressions;
            setEmotionValues({neutral:expressions.neutral, happy:expressions.happy, sad:expressions.sad, angry:expressions.angry, fearful:expressions.fearful});
            setNeutralVal(neutralVal => neutralVal + expressions.neutral);
            setHappyVal(happyVal => happyVal + expressions.happy);
            setSadVal(sadVal => sadVal + expressions.sad);
            setAngryVal(angryVal => angryVal + expressions.angry);
            setFearfulVal(fearfulVal => fearfulVal + expressions.fearful);
            setOverallTotal(overallTotal => overallTotal + expressions.neutral + expressions.happy + expressions.sad + expressions.angry + expressions.fearful);
            setcurrentTotal(expressions.neutral + expressions.happy + expressions.sad + expressions.angry + expressions.fearful);
            
            setEmotionPercentageCurrent({neutral: expressions.neutral / currentTotal})
        });

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
        canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      }
    }, 100)
  }

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  }


  // Get bars working here 
  return (
    <div>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        {
          captureVideo && modelsLoaded ?
            <button onClick={closeWebcam} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
              Close Webcam
            </button>
            :
            <button onClick={startVideo} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
              Open Webcam
            </button>
        }
      </div>
      {
        captureVideo ?
          modelsLoaded ?
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} />
                <canvas ref={canvasRef} style={{ position: 'absolute' }} />
              </div>
            </div>
            :
            <div>loading...</div>
          :
          <>
          </>
      }
      
      <div>
        NEUTRAL {emotionValues.neutral}
        <br/>
        HAPPY {emotionValues.happy}
        <br/>
         SAD {emotionValues.sad}
        <br/>
         ANGRY {emotionValues.angry}
        <br/>
         FEARFUL {emotionValues.fearful}
         <br/>
         <br/>
         BELOW ARE TOTAL VALUES (sum of overall scores)
         <br/>
         <br/>
         NEUTRAL {neutralVal}
        <br/>
        HAPPY {happyVal}
        <br/>
         SAD {sadVal}
        <br/>
         ANGRY {angryVal}
        <br/>
         FEARFUL {fearfulVal}

         <br/>
         <br/>
         total current (not shown in end) {currentTotal}
         <br/>
         total overall (not shown in end) {overallTotal}
         <br/>
         <br/>
         PERCENTAGES
         <br/>
         <br/>
         NEUTRAL {emotionPercentageCurrent.neutral}
        <br/>
        HAPPY {emotionPercentageCurrent.happy}
        <br/>
         SAD {emotionPercentageCurrent.sad}
        <br/>
         ANGRY {emotionPercentageCurrent.angry}
        <br/>
         FEARFUL {emotionPercentageCurrent.fearful}
      </div>
    </div>
  );
}
// Ok I have the values now, just gotta make the bars/scores
// First step is to get time
export default Emotion;
