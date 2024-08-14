import React, { useState, useEffect } from "react";
import { MdOutlinePlayCircle } from "react-icons/md";
import { FaRegStopCircle } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

function Form() {
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            let minutes = displayMessage ? 5 : 5;
            let seconds = 59;

            setSeconds(seconds);
            setMinutes(minutes);
            setDisplayMessage(!displayMessage);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
      setIntervalId(interval);
    } else if (!isActive && seconds !== 0) {
      clearInterval(intervalId);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused, seconds]);

  const startTimer = () => {
    setMinutes(inputMinutes);
    setSeconds(inputSeconds);
    setIsActive(true);
    setIsPaused(false);
  };

  const stopTimer = () => {
    setIsPaused(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setMinutes(0);
    setSeconds(0);
    setDisplayMessage(false);
    clearInterval(intervalId);
    setInputMinutes(0);
    setInputSeconds(0);
  };

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className="pomodoro">
      <div className="input-group">
        <input
          type="number"
          value={inputMinutes}
          onChange={(e) => setInputMinutes(e.target.value)}
          min={"0"}
        />
        <input
          type="number"
          value={inputSeconds}
          onChange={(e) => setInputSeconds(e.target.value)}
          min={"0"}
        />
      </div>
      <div className="body-timer">
        <div className="message">
          {displayMessage && <div>Time For A Break!</div>}
        </div>

        <div className="timer">
          {timerMinutes}:{timerSeconds}
        </div>

        <div className="btn">
          <button id="start" className="btn-add" onClick={startTimer}>
            <MdOutlinePlayCircle />
          </button>
          <button id="stop" className="btn-stop" onClick={stopTimer}>
            <FaRegStopCircle />
          </button>
          <button id="reset" className="btn-reset" onClick={resetTimer}>
            <GrPowerReset />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
