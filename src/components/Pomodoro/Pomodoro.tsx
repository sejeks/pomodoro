import React, { useEffect, useState } from "react";
import Timer from "../Timer/Timer";
import "./Pomodoro.scss";
const gear = require("../../assets/images/gear.png");

type buttonText = "START" | "STOP";
type currentStage = "WORK" | "REST";

function Pomodoro() {
  const [duration, setDuration] = useState<number>(25);
  const [restDuration, setRestDuration] = useState<number>(5);
  const [settingsStatus, setSettingsStatus] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<buttonText>("START");
  const [timeToCount, setTimeToCount] = useState<number>(10);
  const [currentStage, setCurrentStage] = useState<currentStage>("WORK");

  const btnStartClickHandler = () => {
    setButtonText((prevVal) => (prevVal === "START" ? "STOP" : "START"));
  };
  const btnSettingsClickHandler = () => {
    setSettingsStatus((prevVal) => !prevVal);
  };

  const btnSaveClickHandler = () => {
    setSettingsStatus((prevVal) => !prevVal);
    if (duration <= 0) setDuration((prevDur) => prevDur * -1);
    if (restDuration <= 0) setRestDuration((prevDur) => prevDur * -1);
    setTimeToCount(currentStage === "WORK" ? duration * 60 : restDuration * 60);
  };

  const handleChangeDuration = (event: any) => {
    // if (typeof event.target.value === "number" && event.target.value > 0)
    setDuration(event.target.value);
  };

  const handleChangeRestDuration = (event: any) => {
    // if (typeof event.target.value === "number" && event.target.value > 0)
    setRestDuration(event.target.value);
  };

  useEffect(() => {
    if (currentStage === "WORK") {
      setButtonText("START");
      setTimeToCount(duration * 60);
    } else {
      setButtonText("START");
      setTimeToCount(restDuration * 60);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStage]);

  if (settingsStatus) {
    return (
      <div className="pomodoroApp">
        <div className="block1">
          <label htmlFor="duration">Work duration time:</label>
          <input
            max={99}
            min={1}
            type="number"
            name="duration"
            id="duration"
            value={duration}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            onChange={handleChangeDuration}
          />
          <label htmlFor="restDuration">Rest duration time:</label>
          <input
            max={99}
            min={1}
            type="number"
            name="restDuration"
            id="restDuration"
            value={restDuration}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            onChange={handleChangeRestDuration}
          />
        </div>
        <div className="block3">
          <button className="btn settings" onClick={btnSaveClickHandler}>
            SAVE
          </button>
          <button className="btn settings" onClick={btnSettingsClickHandler}>
            <img className="gearImg" src={gear} alt="gear" />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="pomodoroApp">
        <div className="block1">
          <h2>{currentStage}</h2>
        </div>
        <div className="block2">
          <Timer
            timeToCount={timeToCount}
            setTimeToCount={setTimeToCount}
            buttonText={buttonText}
            currentStage={currentStage}
            setCurrentStage={setCurrentStage}
          />
        </div>
        <div className="block3">
          <button className="btn start" onClick={btnStartClickHandler}>
            {buttonText}
          </button>
          <button className="btn settings" onClick={btnSettingsClickHandler}>
            <img className="gearImg" src={gear} alt="gear" />
          </button>
        </div>
      </div>
    );
  }
}

export default Pomodoro;
