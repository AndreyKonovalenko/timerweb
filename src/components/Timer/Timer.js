import React, {useState, useEffect} from 'react';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from '../Button/Button';

import cssObject from './Timer.module.css';

//   helper function
// distance converter:
export const getLeftTime = (distance) => {
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    hours: hours < 10 ? `0${hours}` : hours.toString(),
    minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
    seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
  };
};

const Timer = () => {
  const [distance, setDistance] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinuts] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [divider, setDivider] = useState(1);

  //Buttons logic
  const [startIsActive, setStartIsActive] = useState(true);
  const [resetIsActive, setResetIsActive] = useState(false);
  const [resumeIsActive, setResumeIsActive] = useState(false);
  const [pauseIsActive, setPauseIsActive] = useState(false);

  const onStartHandler = (distance) => {
    let dist = distance;
    let id = setInterval(() => {
      if (dist > 0) {
        dist = dist - 1000;
        setDistance(dist);
      }
    }, 1000);
    setTimerId(id);
    setStartIsActive(false);
    setResetIsActive(true);
    setPauseIsActive(true);
  };

  const onResetHandler = (timeId) => {
    clearInterval(timeId);
    setDistance(null);
    setResetIsActive(false);
    setStartIsActive(true);
  };

  const onPauseHandler = (timerId) => {
    clearInterval(timerId);
    setResumeIsActive(true);
    setPauseIsActive(false);
  };

  const onResumeHandler = () => {
    setPauseIsActive(true);
    onStartHandler(distance);
  };

  const onSilderHours = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setHours(event.target.value);
  };

  const onSilderMinutes = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setMinuts(event.target.value);
  };

  const onSilderSeconds = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setSeconds(event.target.value);
  };

  useEffect(() => {
    //console.log('timerId: ', timerId, 'time left: ', distance);
    if (distance === 0) {
      console.log('reset Timer');
      clearInterval(timerId);
    }
    if (timerId === null) {
      setDistance(
        hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000
      );
      setDivider(
        (hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000) / 100
      );
    }
  }, [distance, timerId, hours, minutes, seconds, setDistance, setDivider]);

  const extractedTime = getLeftTime(distance);
  const barValue = distance / divider;
  return (
    <div>
      <div className={cssObject.ProgressBarContainer}>
        <CircularProgressbar
          value={barValue}
          text={`${extractedTime.hours}:${extractedTime.minutes}:${extractedTime.seconds}`}
          counterClockwise={true}
          styles={{
            path: {
              stroke: `rgba(227, 140, 76, ${barValue})`,
            },
            trail: {
              stroke: 'var(--secondary)',
            },
            text: {
              fontSize: '16px',
              fill: 'var(--quaternary)',
            },
          }}
        />
      </div>
      <div className={cssObject.ButtonContainer}>
        <Button
          onClickHandler={() => onResetHandler(timerId)}
          name='Reset'
          isActive={resetIsActive}
        />
        {startIsActive ? (
          <Button
            onClickHandler={() => onStartHandler(distance)}
            name='Start'
          />
        ) : null}
        {resumeIsActive ? (
          <Button onClickHandler={() => onResumeHandler()} name='Resume' />
        ) : null}
        {pauseIsActive ? (
          <Button onClickHandler={() => onPauseHandler(timerId)} name='Pause' />
        ) : null}
      </div>
      <div className={cssObject.SliderContainer}>
        <div className={cssObject.SliderElement}>
          <span>h</span>
          <input
            className={cssObject.Slider}
            type='range'
            min='0'
            max='24'
            value={hours}
            onInput={onSilderHours}
            name='hours'
          />
        </div>
        <div className={cssObject.SliderElement}>
          <span>m</span>
          <input
            className={cssObject.Slider}
            type='range'
            min='0'
            max='60'
            value={minutes}
            onInput={onSilderMinutes}
            name='minutes'
          />
        </div>
        <div className={cssObject.SliderElement}>
          <span>s</span>
          <input
            className={cssObject.Slider}
            type='range'
            min='0'
            max='60'
            value={seconds}
            onInput={onSilderSeconds}
            name='seconds'
          />
        </div>
      </div>
    </div>
  );
};

export default Timer;
