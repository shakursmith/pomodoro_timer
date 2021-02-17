import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import BreakInterval from "./BreakInterval";
import FocusInterval from "./FocusInterval";
import PlayPause from "./PlayPause";
import Timer from "./Timer";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [inSession, setInSession] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [breakIntervalState, setBreakIntervalState] = useState(5)
  const [focusIntervalState, setFocusIntervalState] = useState(25)
  const [timeRemainingState, setTimeRemainingState] = useState(focusIntervalState*60)
  const alarm = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');

  const increaseByFive = () => {
    if(inSession) return;
    if (focusIntervalState === 60) return;
    setFocusIntervalState((current) => current + 5)
    setTimeRemainingState((current) => current + 300)
  } 
  const decreaseByFive = () => {
    if(inSession) return;
    if (focusIntervalState === 5) return;
    setFocusIntervalState((current) => current - 5)
    setTimeRemainingState((current) => current - 300)
  } 
  const increaseByOne = () => {
    if(inSession) return;
    if (breakIntervalState === 15) return;
    setBreakIntervalState((current) => current + 1)
  } 
  const decreaseByOne = () => {
    if(inSession) return;
    if (breakIntervalState === 1) return;
    setBreakIntervalState((current) => current - 1)
  }
  
  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      setTimeRemainingState((current) => current - 1);
      if (timeRemainingState <= 0) {
        setIsPaused(() => !isPaused)
        alarm.play();
        if (onBreak === false) {
          setOnBreak(() => !onBreak);
          setTimeRemainingState(breakIntervalState*60);
        } else {
          setOnBreak(() => !onBreak);
          setTimeRemainingState(focusIntervalState*60);
        }
      }

    },
    isTimerRunning ? 1000 : null
  );

  
  function playPause() {
    if (!isTimerRunning) setInSession(true);
    if (inSession) setIsPaused((prevState) => !prevState);
    setIsTimerRunning((prevState) => !prevState);
  }
  
  function stopSession() {
    if (!inSession) return;
    setInSession(false); setOnBreak(false); setIsPaused(false); setIsTimerRunning(false);
    setTimeRemainingState(focusIntervalState*60)
  }
  
  return (
    <div className="pomodoro">
      <div className="row mb-5">
        <FocusInterval focusInterval={focusIntervalState} inSession={inSession} upByFive={increaseByFive} downByFive={decreaseByFive} />
        <BreakInterval breakInterval={breakIntervalState} upByOne={increaseByOne} downByOne={decreaseByOne} />
      </div>
      <PlayPause playPause={playPause} stopSession={stopSession} isTimerRunning={isTimerRunning} />
      <Timer timeRemainingState={timeRemainingState} inSession={inSession} onBreak={onBreak} isPaused={isPaused} focusInterval={focusIntervalState} breakInterval={breakIntervalState} />
    </div>
  );
}

export default Pomodoro;
