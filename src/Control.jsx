import { useState, useEffect } from 'react';
import ControlPlayer from './components/ControlPlayer';

export default function Control({ socket }) {
  const player = {
    club: 'KLUB (DŁUGA NAZWA)',
    name: 'AAAAA BBBBB',
  };

  function sendMess() {
    if (socket && socket.readyState === WebSocket.OPEN)
      socket.send(JSON.stringify({ redPoints: matchInfoBlue.points }));
  }

  const [matchInfoRed, setMatchInfoRed] = useState({
    points: 4,
    balls: 3,
    time: 5 * 60,
    started: false,
  });
  const [matchInfoBlue, setMatchInfoBlue] = useState({
    points: 4,
    balls: 3,
    time: 5 * 60,
    started: false,
  });
  return (
    <div className='container-fluid d-flex main p-0 position-relative text-white'>
      <ControlPlayer
        playerInfo={player}
        matchInfo={matchInfoBlue}
        setMatchInfo={setMatchInfoBlue}
      />
      <div className='header controlHeader fw-bold fs-4 text-center d-flex flex-column '>
        <div className='bg-dark border p-2'>
          <div>END 2/4</div>
        </div>
        <button
          onClick={sendMess}
          className='btn btn-warning mx-2 mt-4 fs-4 fw-bold'
        >
          BREAK
        </button>
        <button className='btn btn-warning mx-2 mt-5 fs-4 fw-bold'>
          END RESULT
        </button>
      </div>
      <div className='header mainTimer'>
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
      </div>
      <div className='header bottom-0' style={{ width: '60vw' }}>
        <div className='bg-dark d-flex justify-content-between border p-2 temp'>
          <button className='btn btn-warning m-2 fw-bold'>VIEW RAPORT</button>
          <div className='header fs-2'>END BUFFER</div>
          <div className='border fs-2 px-1'>0:00</div>
        </div>
      </div>
      <ControlPlayer
        playerInfo={player}
        matchInfo={matchInfoRed}
        setMatchInfo={setMatchInfoRed}
        isRightSide
      />
    </div>
  );
}
