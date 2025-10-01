import { use, useEffect, useState } from 'react';
import ControlPlayer from './components/ControlPlayer';
import { supabase } from './supabase';
import { useParams } from 'react-router';

export default function Control({ setBreak, isBreak }) {
  const [socket, setSocket] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetch() {
      const temp = await supabase.from('matches').select().eq('id', id);
      setMatchData(temp.data[0]);
    }
    fetch();

    const ws = new WebSocket('ws://localhost:3030');

    ws.onopen = () => console.log('Połączono z websocketem');

    ws.onmessage = (event) => {
      if (JSON.parse(event.data).start && JSON.parse(event.data).id === -1) {
        setInit(true);
      }
    };

    setSocket(ws);

    return () => ws.close();
  }, []);

  function sendMess() {
    setInit(false);
    if (socket && socket.readyState === WebSocket.OPEN)
      socket.send(
        JSON.stringify({
          id: id,
          red: matchInfoRed,
          blue: matchInfoBlue,
        }),
      );
  }

  const [matchInfoRed, setMatchInfoRed] = useState({
    points: 4,
    balls: 3,
    timerDisabled: false,
    started: false,
  });
  const [matchInfoBlue, setMatchInfoBlue] = useState({
    points: 4,
    balls: 3,
    timerDisabled: false,
    started: false,
  });

  const [matchData, setMatchData] = useState([]);
  const [init, setInit] = useState(false);

  return (
    <div className='container-fluid d-flex main p-0 position-relative text-white'>
      <ControlPlayer
        init={init}
        update={sendMess}
        playerInfo={{
          club: matchData.club1,
          name: matchData.player1,
        }}
        matchInfo={matchInfoRed}
        toggleOtherTimer={() => {
          setMatchInfoBlue({
            ...matchInfoBlue,
            break: false,
            timerDisabled: !matchInfoBlue.timerDisabled,
          });
        }}
        setMatchInfo={setMatchInfoRed}
        isBreak={isBreak}
      />
      <div className='header controlHeader fw-bold fs-4 text-center d-flex flex-column '>
        <div className='bg-dark border p-2'>
          <div>END 2/{matchData.maxEnds}</div>
        </div>
        <button
          className='btn btn-warning mx-2 mt-4 fs-4 fw-bold'
          onClick={() => {
            setBreak(!isBreak);
            setMatchInfoRed({
              break: true,
              points: matchInfoRed.points,
              balls: matchInfoRed.balls,
              started: false,
              time: 90,
            });
            setMatchInfoBlue({
              break: true,
              points: matchInfoBlue.points,
              balls: matchInfoBlue.balls,
              started: false,
              time: 90,
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
        init={init}
        update={sendMess}
        playerInfo={{
          club: matchData.club2,
          name: matchData.player2,
        }}
        matchInfo={matchInfoBlue}
        setMatchInfo={setMatchInfoBlue}
        toggleOtherTimer={() => {
          setMatchInfoRed({
            ...matchInfoRed,
            break: false,
            timerDisabled: !matchInfoRed.timerDisabled,
          });
        }}
        isBreak={isBreak}
        isRightSide
      />
    </div>
  );
}
