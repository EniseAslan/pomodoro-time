import React, { useState, useEffect } from "react";
import { MdOutlinePlayCircle } from "react-icons/md";
import { FaRegStopCircle } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import btn from "./btn";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function Form() {
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [breakMinute, setBreakMinute] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            let minutes = breakMinute !== 0 ? breakMinute : 5;
            let seconds = 59;

            setSeconds(seconds);
            setMinutes(minutes - 1);
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
    if (inputMinutes <= 0 && inputSeconds <= 0) {
      setMinutes(0);
      setSeconds(0);
      alert("Lütfen geçerli bir zaman giriniz");
      return;
    }

    setMinutes(inputMinutes);
    setSeconds(inputSeconds);
    setIsActive(true);
    setIsPaused(false);
  };

  const stopTimer = () => {
    if (inputMinutes <= 0 && inputSeconds <= 0) {
      setMinutes(0);
      setSeconds(0);
      alert("Lütfen geçerli bir zaman giriniz");
      return;
    }
    setIsPaused(true);
  };

  const resetTimer = () => {
    if (inputMinutes <= 0 && inputSeconds <= 0) {
      setMinutes(0);
      setSeconds(0);
      alert("Lütfen geçerli bir zaman giriniz");
      return;
    }
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
        <div className="time">
          <h6>Time:</h6>
          <input
            title="minutes"
            type="number"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(e.target.value)}
            min={"0"}
            style={{marginLeft:"30px"}}
          />
          <input
            title="seconds"
            type="number"
            value={inputSeconds}
            onChange={(e) => setInputSeconds(e.target.value)}
            min={"0"}
          />
        </div>
        <div className="break">
          <h6>Break:</h6>
          <input
            title="minutes"
            type="number"
            value={breakMinute}
            onChange={(e) => setBreakMinute(e.target.value)}
            min={"0"}
          />
        </div>
      </div>

      <div className="body-timer">
        <div className="message">
          {displayMessage && <div>Time For A Break!</div>}
        </div>

        <div className="timer">
          {timerMinutes}:{timerSeconds}
        </div>

        <div className="btn">
          <Tippy content="start">
            <btn id="start" className="btn-add" onClick={startTimer}>
              <MdOutlinePlayCircle />
            </btn>
          </Tippy>
          <Tippy content="stop">
            <btn id="stop" className="btn-stop" onClick={stopTimer}>
              <FaRegStopCircle />
            </btn>
          </Tippy>

          <btn id="reset" className="btn-reset" onClick={resetTimer}>
            <GrPowerReset />
          </btn>
        </div>
      </div>
    </div>
  );
}

export default Form;
