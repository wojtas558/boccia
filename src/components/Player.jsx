import { useEffect, useState, useRef } from 'react';
import Ball from './Ball';

export default function Player({
  playerInfo,
  matchInfo,
  isRightSide,
  switchColors,
}) {
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  function getColor() {
    if (isRightSide) return switchColors ? 'redPlayer' : 'bluePlayer';
    else return switchColors ? 'bluePlayer' : 'redPlayer';
  }

  function showBalls() {
    const points = [];
    for (let i = 0; i < 6; i++) {
      points.push(
        <Ball key={i} scored={6 - matchInfo.balls <= i} getColor={getColor} />,
      );
    }

    return points;
  }

  function getTime() {
    return (
      parseInt(time / 60) +
      ':' +
      (time % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })
    );
  }

  useEffect(() => {
    console.log(matchInfo.timer, matchInfo.time);

    setTimer(matchInfo.timer ?? null);
    setTime(matchInfo.time ?? time);
  }, [matchInfo]);

  const [timer, setTimer] = useState(null);
  const [time, setTime] = useState(5 * 60);

  useInterval(() => setTime(time - 1), timer);

  return (
    <div
      className={
        'p-0 position-relative ' +
        (isRightSide ? 'rightSide ' : '') +
        getColor(isRightSide)
      }
    >
      <div className='fs-1 m-2 position-absolute'>
        <div className='d-flex'>
          <div
            className={
              'bg-white border flag ' + (isRightSide ? 'ms-2' : 'me-2')
            }
          ></div>
          {playerInfo.club}
        </div>
        <span>{playerInfo.name}</span>
      </div>
      <div className='translate-middle position-absolute top-40 start-50 points'>
        {matchInfo.points}
      </div>
      <div className='bg-dark position-absolute bottom-0 w-100 border'>
        <div className='d-flex justify-content-between p-3 pb-0'>
          {showBalls()}
        </div>
        <div className='text-center playerTimer lh-sm'>{getTime()}</div>
        <div className='border border-dark' />
        {/* JAK USUNIESZ TEN DIV TO SIE ROZJEŻDŻA STRONA I POJAWIA SIĘ SCROLL 
        NIE MAM POJECIA DLACZEGO, ALE NA RAZIE ZOSTAJE  */}
      </div>
    </div>
  );
}
