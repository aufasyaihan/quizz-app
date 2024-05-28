import { useEffect, useState } from "react";

export default function QuestionTimer({ time, onTimeout }) {
  const [remaningTime, setRemainingTime] = useState(time);
  useEffect(() => {
    console.log("time started");
    const timer = setTimeout(onTimeout, time);
    return () => {
      console.log("time stopped");
      clearTimeout(timer);
    };
  }, [onTimeout, time]);

  useEffect(() => {
    console.log("countdown start");
    const timeLeft = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      console.log("countdown stop");
      clearInterval(timeLeft);
    };
  }, []);

  return <progress value={remaningTime} max={time} />;
}
