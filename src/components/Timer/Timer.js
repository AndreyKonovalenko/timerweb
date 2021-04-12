import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import cssObject from './Timer.module.css';

//   let dist = distance;
//   return (dispatch) => {
//     let id = setInterval(() => {
//       if (dist > 0) {
//         dist = dist - 100;
//         // interval controller
//         intervalController(dist, currentTimer, sounds);
//         dispatch(setDistance(dist));
//       }
//     }, 100);
//     dispatch(setTimerIdentifyingValue(id));
//   };
// };


const Timer = () => {
  const [distance, setDistance] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinuts] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const onStartHandler = (distance) => {
    let dist = distance;
    let id = setInterval(() => {
      if (dist > 0) {
        dist = dist - 1000;
        setDistance(dist);
      }
    }, 1000);
    setTimerId(id);
  };

  const onStopHandler = (timerID) => {
    clearInterval(timerId);
    console.log('stop');
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
    console.log('timerId: ', timerId, 'time left: ', distance);
    // if (distance === 0) {
    //   console.log('reset Timer');
    //   clearInterval(timerId);
    // }
    setDistance(hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000)
  }, [distance, timerId, hours, minutes, seconds]);

  const data = distance / 1000;

  return (
    <div>
      <div className={cssObject.SliderContainer}>
        <div>
        <input
          type='range'
          min='0'
          max='24'
          value={hours}
          onInput={onSilderHours}
          name="hours"
        />
        </div>
        <div>
          <input
            type='range'
            min='0'
            max='60'
            value={minutes}
            onInput={onSilderMinutes}
            name='minutes'
          />
        </div>
        <div>
          <input
            type='range'
            min='0'
            max='60'
            value={seconds}
            onInput={onSilderSeconds}
            name='seconds'
          />
        </div>
      </div>
      <p>{distance}</p>
      <CircularProgressbar
        value={data}
        text={`${hours}:${minutes}:${seconds}`}
        counterClockwise={true}
      />
      <button onClick={() => onStartHandler(distance)}>start</button>
      <button onClick={() => onStopHandler(timerId)}>stop</button>
    </div>
  );
};

export default Timer;
