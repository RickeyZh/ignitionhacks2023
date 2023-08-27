import { useState, useEffect } from 'react';

const Timer = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const deadline = Date.now();
    const getTime = () => {
        const time =  Date.now()-deadline;
        setHours(Math.floor(time / (1000 * 60 * 60)));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);
    
        return () => clearInterval(interval);
      }, []);
    
    return (
        <div className="timer">
            Hours: {hours} Minutes: {minutes} Seconds: {seconds}
        </div>
    );
};
export default Timer;