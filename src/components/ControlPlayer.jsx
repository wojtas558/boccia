import { useEffect, useRef, useState } from 'react';
import Ball from './Ball';

export default function ControlPlayer({
  init,
  playerInfo,
  matchInfo,
  isRightSide,
  isBreak,
  setBreak,
  update,
  switchColors,
  toggleOtherTimer,
  setMatchInfo,
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

  useEffect(() => {
    update();
  }, [matchInfo]);

  useEffect(() => {
    update();
  }, [init]);

  function getColor() {
    if (isRightSide) return switchColors ? 'redPlayer' : 'bluePlayer';
    else return switchColors ? 'bluePlayer' : 'redPlayer';
  }
  const maxPoints = 6;
  const [timer, setTimer] = useState(null);
  const [time, setTime] = useState(5 * 60);

  useInterval(() => setTime(time - 1), isBreak ? null : timer);

  function getTime() {
    return (
      parseInt(time / 60) +
      ':' +
      (time % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })
    );
  }

  function showBalls() {
    const points = [];
    for (let i = 0; i < maxPoints; i++) {
      points.push(
        <Ball
          height={60}
          key={i}
          scored={maxPoints - matchInfo.balls <= i}
          getColor={getColor}
        />,
      );
    }

    return points;
  }

  function startTimer() {
    setBreak(true);
    setMatchInfo({ ...matchInfo, break: false, timer: 1000 });
    toggleOtherTimer();
    setTimer(1000);
  }

  function stopTimer() {
    toggleOtherTimer();
    setMatchInfo({ ...matchInfo, timerDisabled: false, timer: null });
    setTimer(null);
  }

  return (
    <div
      className={
        'p-0 position-relative ' +
        (isRightSide ? 'rightSide ' : '') +
        getColor(isRightSide)
      }
    >
      <div className='border custom bg-dark'>
        <div className='d-flex'>
          <div className='p-2 fs-2 flex-fill'>
            <div className='d-flex align-items-center'>
              <div
                className={
                  'bg-white border flag ' + (isRightSide ? 'ms-2' : 'me-2')
                }
              ></div>
              {playerInfo.club}
            </div>
            <span>{playerInfo.name}</span>
          </div>
          <div
            className={
              'text-center align-items-center px-2 pb-2 ' +
              (isRightSide ? 'border-end' : 'border-start')
            }
          >
            <span className='playerTimer'>
              {matchInfo.points}
              {isBreak}
            </span>
            <div className='d-flex text-center d-grid gap-3'>
              <button
                className='btn btn-outline-success'
                onClick={() => {
                  setMatchInfo({
                    points: matchInfo.points + 1,
                    balls: matchInfo.balls,
                    timerDisabled: matchInfo.timerDisabled,
                    started: matchInfo.started,
                  });
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4' />
                </svg>
              </button>
              <button
                className='btn btn-outline-danger'
                onClick={() => {
                  if (matchInfo.points > 0)
                    setMatchInfo({
                      points: matchInfo.points - 1,
                      balls: matchInfo.balls,
                      timerDisabled: matchInfo.timerDisabled,
                      started: matchInfo.started,
                    });
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8' />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className='border-top d-flex flex-column p-2 position-relative'>
          <div className='bg-warning text-dark fs-1 d-inline-block px-1 mb-2 fw-bold align-self-center rounded-3'>
            {getTime()}
          </div>
          <div
            className={
              'position-absolute top-0 p-2 d-flex gap-3 ' +
              (isRightSide ? 'start-0' : 'end-0')
            }
          >
            <svg
              className='text-success'
              xmlns='http://www.w3.org/2000/svg'
              width='50'
              height='50'
              fill='currentColor'
              viewBox='0 0 16 16'
              onClick={() => {
                if (matchInfo.balls < 6)
                  setMatchInfo({
                    points: matchInfo.points,
                    balls: matchInfo.balls + 1,
                    timerDisabled: matchInfo.timerDisabled,
                    started: matchInfo.started,
                  });
              }}
            >
              <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
              <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4' />
            </svg>
            <svg
              className='text-danger'
              xmlns='http://www.w3.org/2000/svg'
              width='50'
              height='50'
              fill='currentColor'
              viewBox='0 0 16 16'
              onClick={() => {
                if (matchInfo.balls > 0)
                  setMatchInfo({
                    points: matchInfo.points,
                    balls: matchInfo.balls - 1,
                    timerDisabled: matchInfo.timerDisabled,
                    started: matchInfo.started,
                  });
              }}
            >
              <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
              <path d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8' />
            </svg>
          </div>
          <div className='d-flex justify-content-between align-items-center'>
            {showBalls()}
          </div>
        </div>
      </div>
      <div className='translate-middle position-absolute bottom-40 start-50 d-flex gap-4'>
        <button
          className='btn btn-warning fs-3 fw-semibold'
          disabled={matchInfo.started || matchInfo.timerDisabled}
          onClick={() => {
            startTimer();
            setMatchInfo({
              points: matchInfo.points,
              balls: matchInfo.balls,
              timerDisabled: matchInfo.timerDisabled,
              started: !matchInfo.started,
              time: time,
              timer: 1000,
            });
          }}
        >
          Start
        </button>
        <button
          className='btn btn-warning fs-3 fw-semibold'
          disabled={!matchInfo.started}
          onClick={() => {
            stopTimer();
            setMatchInfo({
              points: matchInfo.points,
              balls: matchInfo.balls,
              timerDisabled: matchInfo.timerDisabled,
              started: !matchInfo.started,
              time: time,
            });
          }}
        >
          Stop
        </button>
      </div>
    </div>
  );
}
