import React, {useState, useEffect} from 'react';

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

  useEffect(() => {
    console.log('timerId: ', timerId, 'time left: ', distance);
    if (distance === 0) {
      console.log('reset Timer');
      clearInterval(timerId);
      setDistance(6000);
    }
  }, [distance, timerId]);

  return (
    <div>
      <p>{distance}</p>
      <button onClick={() => onStartHandler(distance)}>start</button>
      <button onClick={() => onStopHandler(timerId)}>stop</button>
    </div>
  );
};

export default Timer;
