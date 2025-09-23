import { useEffect, useRef, useState } from 'react';
import ControlPlayer from './components/ControlPlayer';
import bootstrapBundle from 'bootstrap/dist/js/bootstrap.bundle';
import { useLocation } from 'react-router';

export default function Control({ socket }) {
  const player = {
    club: 'KLUB (DŁUGA NAZWA)',
    name: 'AAAAA BBBBB CCCCC',
  };

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
    setModal(new bootstrapBundle.Modal('#breakModal'));
  }, []);

  const [timer, setTimer] = useState(null);
  const [time, setTime] = useState(5);
  const [modal, setModal] = useState();
  const [isBreak, setBreak] = useState(false);
  function sendMess() {
    if (socket && socket.readyState === WebSocket.OPEN)
      socket.send(JSON.stringify({ redPoints: matchInfoBlue.points }));
  }

  const [matchInfoRed, setMatchInfoRed] = useState({
    points: 4,
    balls: 3,
    started: false,
  });
  const [matchInfoBlue, setMatchInfoBlue] = useState({
    points: 4,
    balls: 3,
    started: false,
  });

  useInterval(() => setTime(time - 1), timer);
  const location = useLocation();

  function getTime() {
    if (isBreak && time === 0) {
      setTimer(null);
      setBreak(false);
      modal.hide();

      return '0:00';
    }

    return (
      parseInt(time / 60) +
      ':' +
      (time % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })
    );
  }

  return (
    <div className='container-fluid d-flex main p-0 position-relative text-white'>
      <ControlPlayer
        playerInfo={{ club: location.state.club1, name: location.state.name1 }}
        matchInfo={matchInfoBlue}
        setMatchInfo={setMatchInfoBlue}
        isBreak={isBreak}
      />
      <div
        className='modal fade'
        id='breakModal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='breakModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content bg-dark text-white'>
            <div className='modal-body modal-text text-center p-0'>
              <div>BREAK</div>
              <div>{getTime()}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='header controlHeader fw-bold fs-4 text-center d-flex flex-column '>
        <div className='bg-dark border p-2'>
          <div>END 2/4</div>
        </div>
        <button
          data-bs-toggle='modal'
          data-bs-target='#breakModal'
          className='btn btn-warning mx-2 mt-4 fs-4 fw-bold'
          onClick={() => {
            sendMess();
            modal.show();
            setTimer(1000);
            setBreak(!isBreak);
            setTime(5 * 60);
            setMatchInfoRed({
              points: matchInfoRed.points,
              balls: matchInfoRed.balls,
              started: false,
            });
            setMatchInfoBlue({
              points: matchInfoBlue.points,
              balls: matchInfoBlue.balls,
              started: false,
            });
          }}
        >
          BREAK
        </button>
        <button className='btn btn-warning mx-2 mt-5 fs-4 fw-bold'>
          END RESULT
        </button>
      </div>
      {/* <div className='header mainTimer'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='160'
          height='160'
          fill='currentColor'
          viewBox='0 0 16 16'
        >
          <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
          <path d='M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0z' />
        </svg>
      </div> */}
      <div className='header bottom-0' style={{ width: '60vw' }}>
        <div className='bg-dark d-flex justify-content-between border p-2 temp'>
          <button className='btn btn-warning m-2 fw-bold'>VIEW RAPORT</button>
          <div className='header fs-2'>END BUFFER</div>
          <div className='border fs-2 px-1'>0:00</div>
        </div>
      </div>
      <ControlPlayer
        playerInfo={{ club: location.state.club2, name: location.state.name2 }}
        matchInfo={matchInfoRed}
        setMatchInfo={setMatchInfoRed}
        isBreak={isBreak}
        isRightSide
      />
    </div>
  );
}
