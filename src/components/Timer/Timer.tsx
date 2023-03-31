import React, { useEffect, useRef } from "react";
import "./Timer.scss";

const alarm = require("../../assets/sounds/alarm.wav")

const playAlarmSound = (): void => {
  new Audio(alarm).play()
}

function Timer(props: {
  setTimeToCount: Function;
  timeToCount: number;
  buttonText: string;
  currentStage: string;
  setCurrentStage: Function;
}) {
  const { setTimeToCount, timeToCount, buttonText, currentStage, setCurrentStage } = props;

  const timer = useRef<number | undefined | NodeJS.Timer>(undefined);

  useEffect(() => {
    if (timeToCount > 0 && buttonText === "STOP") {
      timer.current = setTimeout(() => {
        setTimeToCount(timeToCount - 1);
        clearTimeout(timer.current);
      }, 1000);
    } else if (buttonText === "START") {
      clearTimeout(timer.current);
    } else if (timeToCount === 0) {
      clearTimeout(timer.current);
      playAlarmSound();
      setCurrentStage(currentStage === "REST" ? "WORK": "REST")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeToCount, buttonText]);

  useEffect(() => {
    setTimeToCount((prevTime: number) => prevTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonText]);

  const minutes = Math.floor(timeToCount / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeToCount % 60).toString().padStart(2, "0");

  return (
      <p className="timeText">
        {minutes}:{seconds}
      </p>
  );
}

export default Timer;
