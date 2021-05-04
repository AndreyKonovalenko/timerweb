import React, { useState, useEffect, useReducer } from 'react';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
}
from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from '../Button/Button';

import cssObject from './Timer.module.css';

//   helper function
// distance converter:
const getLeftTime = (distance) => {
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

const calculateFullDistance = (data) => {
  return (
    data.hours * 60 * 60 * 1000 + data.minutes * 60 * 1000 + data.seconds * 1000
  );
};

// TIMER TIME ACTION
const SET_HOURS = 'SET_HOURS';
const SET_MINUTES = 'SET_MINUTES';
const SET_SECONDS = 'SET_SECONDS';
//const SET_DISTANCE = 'SET_DISTANCE';
// TIMER ACTION CREATOR
const setHours = (hours) => ({ type: SET_HOURS, payload: hours });
const setMinutes = (minutes) => ({ type: SET_MINUTES, payload: minutes });
const setSeconds = (seconds) => ({ type: SET_SECONDS, payload: seconds });
//const setStartIn = (startIn) => ({type: SET_STARTIN, payload: startIn});
//const setDistance = (distance) => ({ type: SET_DISTANCE, payload: distance });

const initialState = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  // startIn: 0,
  //  distance: 0,
};

// TIMER TIME REDUCER
const reducer = (state, action) => {
  switch (action.type) {
    case SET_HOURS:
      return {
        ...state,
        hours: action.payload,
      };
    case SET_MINUTES:
      return {
        ...state,
        minutes: action.payload,
      };
    case SET_SECONDS:
      return {
        ...state,
        seconds: action.payload,
      };
      // case SET_STARTIN:
      //   return {
      //     ...state,
      //     startIn: action.payload,
      //   };
      // case SET_DISTANCE:
      //   return {
      //     ...state,
      //     distance: action.payload,
      //   };
    default:
      return state;
  }
};

const Timer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [timerId, setTimerId] = useState(null);
  //let make distance local
  const [distance, setDistance] = useState(0);
  const [startIn, setStartIn] = useState(0);

  const [divider, setDivider] = useState(1);
  // const [fullDistance, setFullDistance] = useState(null);
  // const [startNow, setStartNow] = useState(false);
  const [childDivider, setChildDivider] = useState(1);

  //Buttons logic
  const [startIsActive, setStartIsActive] = useState(true);
  const [resetIsActive, setResetIsActive] = useState(false);
  const [resumeIsActive, setResumeIsActive] = useState(false);
  const [pauseIsActive, setPauseIsActive] = useState(false);

  const onStartHandler = (data, start) => {
    setStartIsActive(false);
    setResetIsActive(true);
    setPauseIsActive(true);
    setTimerId(timer(data, start));
  };

  const timer = (data, start) => {
    const timerId = setInterval(() => {
      if (start > 0) {
        start = start - 1;
        setStartIn(start);
      }
      else {
        if (data > 0) {
          data = data - 1000;
          setDistance(data);
        }
      }
    }, 1000);
    return timerId;
  };

  const onResetHandler = (timeId) => {
    clearInterval(timeId);
    setTimerId(null);
    setResetIsActive(false);
    setStartIsActive(true);
    setPauseIsActive(false);
    setResumeIsActive(false);
  };

  const onPauseHandler = (timerId) => {
    clearInterval(timerId);
    setResumeIsActive(true);
    setPauseIsActive(false);
  };

  const onResumeHandler = () => {
    setPauseIsActive(true);
    onStartHandler(state.distance);
    setResumeIsActive(false);
  };

  const onSilderHours = (event) => {
    event.preventDefault();
    dispatch(setHours(event.target.value));
  };

  const onSilderMinutes = (event) => {
    event.preventDefault();
    dispatch(setMinutes(event.target.value));
  };

  const onSilderSeconds = (event) => {
    event.preventDefault();
    dispatch(setSeconds(event.target.value));
  };

  const onSilderStartIn = (event) => {
    event.preventDefault();
    setStartIn(event.target.value);
  };

  useEffect(() => {
    console.log(timerId);
    console.log('state is:', state);
    console.log('startIn', startIn);

    console.log(calculateFullDistance(state));

    if (timerId === null) {
      setDistance(calculateFullDistance(state));
      setDivider(calculateFullDistance(state) / 100);
      setChildDivider(startIn / 100);
    }
  }, [state, timerId, startIn]);
  const extractedTime = getLeftTime(distance);
  const barValue = distance / divider;
  const childBarValue = startIn / childDivider;
  //const barValue = 10;
  return (
    <div>
      {distance}
      <div className={cssObject.ProgressBarContainer}>
        <CircularProgressbarWithChildren
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
        >
        <div style={{ width: "84%" }}>
          <CircularProgressbar
            value={childBarValue}
            counterClockwise={true}
            text={startIn}
            styles={buildStyles({
              trailColor: "transparent"
            })}
          />
        </div>
        </CircularProgressbarWithChildren>

      </div>

      <div className={cssObject.ButtonContainer}>
        <Button
          onClickHandler={() => onResetHandler(timerId)}
          name='Reset'
          isActive={resetIsActive}
        />
        {startIsActive ? (
          <Button
            onClickHandler={() => onStartHandler(distance, startIn)}
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
            value={state.hours}
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
            value={state.minutes}
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
            value={state.seconds}
            onInput={onSilderSeconds}
            name='seconds'
          />
        </div>
        <span>{startIn}</span>
        <div className={cssObject.SliderElement}>
          <span>start in</span>
          <input
            className={cssObject.Slider}
            type='range'
            min='0'
            max='60'
            value={startIn}
            onInput={onSilderStartIn}
            name='startIn'
          />
        </div>
      </div>
    </div>
  );
};

export default Timer;
