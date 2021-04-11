import React, {useState, useEffect} from 'react';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
  const [distance, setDistance] = useState(6000);
  const [timerId, setTimerId] = useState(null);
  const [range, setRange] = useState(0);

  const onStartHandler = (distance) => {
    let dist = distance;
    let id = setInterval(() => {
      if (dist > 0) {
        dist = dist - 100;
        setDistance(dist);
      }
    }, 100);
    setTimerId(id);
  };

  const onStopHandler = (timerID) => {
    clearInterval(timerId);
    console.log('stop');
  };

  const onSilderHandler = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setRange(event.target.value);
    setDistance(event.target.value * 100);
  };

  useEffect(() => {
    console.log('timerId: ', timerId, 'time left: ', distance);
    if (distance === 0) {
      console.log('reset Timer');
      clearInterval(timerId);
      setDistance(6000);
    }
  }, [distance, timerId]);
  const data = distance / 60;

  return (
    <div>
      <div>
        <input
          type='range'
          min='0'
          max='60'
          value={range}
          onInput={onSilderHandler}
        />
      </div>
      <p>{distance}</p>
      <CircularProgressbar
        value={data}
        text={distance}
        counterClockwise={true}
      />
      <button onClick={() => onStartHandler(distance)}>start</button>
      <button onClick={() => onStopHandler(timerId)}>stop</button>
    </div>
  );
};

export default Timer;
