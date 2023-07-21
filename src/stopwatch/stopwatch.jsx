import { useEffect, useState, useRef } from "react";
import "./stopwatch.css";

const Stopwatch = ({ start, stop }) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (start && !intervalRef.current) {
      setTime(0);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    if (stop && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [start, stop]);

  const formatTime = () => {
    const getMinutes = Math.floor((time / (60 * 1000)) % 60);
    const getSeconds = Math.floor((time / 1000) % 60);
    const getMillis = Math.floor((time / 10) % 100);

    return {
      minutes: getMinutes < 10 ? `0${getMinutes}` : getMinutes,
      seconds: getSeconds < 10 ? `0${getSeconds}` : getSeconds,
      millis: getMillis < 10 ? `0${getMillis}` : getMillis,
    };
  };

  const { minutes, seconds, millis } = formatTime();

  return (
    <div className="stopwatch">
      <div className="time-main">
        {minutes}:{seconds}
      </div>
      <div className="time-sub">{millis}</div>
    </div>
  );
};

export default Stopwatch;
