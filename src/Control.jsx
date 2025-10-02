import { useEffect, useRef, useState } from 'react';
import ControlPlayer from './components/ControlPlayer';
import { supabase } from './supabase';
import { useParams } from 'react-router';

export default function Control({ setBreak, isBreak }) {
  const [socket, setSocket] = useState(null);
  const [timer, setTimer] = useState(null);
  const [time, setTime] = useState(90);
  const { id } = useParams();

  useEffect(() => {
    async function fetch() {
      const temp = await supabase.from('matches').select().eq('id', id);
      setMatchData({ ...temp.data[0], currentEnd: 1 });
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
  }, [id]);

  function getTime() {
    if (time === 0) {
      setTimer(null);
      setTime(90);

      return '0:00';
    }

    return (
      parseInt(time / 60) +
      ':' +
      (time % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })
    );
  }

  function sendMess() {
    setInit(false);
    if (socket && socket.readyState === WebSocket.OPEN)
      socket.send(
        JSON.stringify({
          id: id,
          currentEnd: matchData.currentEnd,
          red: matchInfoRed,
          blue: matchInfoBlue,
        }),
      );
  }

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

  const [matchInfoRed, setMatchInfoRed] = useState({
    points: 0,
    balls: 6,
    timerDisabled: false,
    started: false,
  });
  const [matchInfoBlue, setMatchInfoBlue] = useState({
    points: 0,
    balls: 6,
    timerDisabled: false,
    started: false,
  });

  const [matchData, setMatchData] = useState([]);
  const [init, setInit] = useState(false);

  useEffect(() => {
    sendMess();
  }, [matchData]);

  useEffect(() => {
    setTime(90);

    setTimer(isBreak ? null : 1000);
  }, [isBreak]);

  useInterval(() => {
    setTime(time - 1);
  }, timer);

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
        setBreak={setBreak}
      />
      <div className='header controlHeader fw-bold fs-4 text-center d-flex flex-column '>
        <div className='bg-dark border p-2 d-flex align-items-center justify-content-center gap-2'>
          <button
            className='btn btn-outline-danger'
            onClick={() => {
              if (matchData.currentEnd > 1)
                setMatchData({
                  ...matchData,
                  currentEnd: matchData.currentEnd - 1,
                });
            }}
          >
            <b>-</b>
          </button>
          <div>
            END {matchData.currentEnd}/{matchData.maxEnds}
          </div>
          <button
            className='btn btn-outline-success'
            onClick={() => {
              if (matchData.currentEnd < matchData.maxEnds)
                setMatchData({
                  ...matchData,
                  currentEnd: matchData.currentEnd + 1,
                });
            }}
          >
            <b>+</b>
          </button>
        </div>
        <button
          className='btn btn-warning mx-2 mt-4 fs-4 fw-bold'
          onClick={() => {
            setBreak(!isBreak);
            console.log(isBreak);

            setMatchInfoRed({
              break: isBreak,
              points: matchInfoRed.points,
              balls: matchInfoRed.balls,
              started: false,
              breakTime: 90,
            });
            setMatchInfoBlue({
              break: isBreak,
              points: matchInfoBlue.points,
              balls: matchInfoBlue.balls,
              started: false,
              breakTime: 90,
            });
          }}
        >
          PRZERWA
        </button>
        <button className='btn btn-warning mx-2 mt-5 fs-4 fw-bold'>
          WYNIK KOŃCOWY
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
          <button className='btn btn-warning m-2 fw-bold'>ZOBACZ RAPORT</button>
          <div className='header fs-2'>Do końca przerwy</div>
          <div className='border fs-2 px-1'>{getTime()}</div>
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
        setBreak={setBreak}
        isRightSide
      />
    </div>
  );
}
