import { useState, useEffect, useRef } from 'react';
import bootstrapBundle from 'bootstrap/dist/js/bootstrap.bundle';
import Player from './Player';
import { useLocation } from 'react-router';

export default function Display({ setBreak, isBreak }) {
  useEffect(() => {
    setModal(new bootstrapBundle.Modal('#breakModal'));
    const ws = new WebSocket('ws://localhost:3030');
    ws.onopen = () =>
      ws.send(JSON.stringify({ id: -1, red: {}, blue: {}, start: true }));

    ws.onmessage = (event) => {
      let data = JSON.parse(event.data);
      if (location.state.id == data.id) setMatchInfo(data);
    };

    setSocket(ws);

    return () => ws.close();
  }, []);

  const [modal, setModal] = useState();
  const [matchInfo, setMatchInfo] = useState({ red: {}, blue: {} });
  const [timer, setTimer] = useState(null);
  const [time, setTime] = useState(90);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (matchInfo.red.break) {
      modal.show();
      setTimer(1000);
    }
  }, [matchInfo.red.break]);

  function getTime() {
    if (time === 0) {
      modal.hide();
      setMatchInfo({
        red: {
          break: false,
          points: matchInfo.red.points,
          balls: matchInfo.red.balls,
          started: false,
          time: 90,
        },
        blue: {
          break: false,
          points: matchInfo.blue.points,
          balls: matchInfo.blue.balls,
          started: false,
          time: 90,
        },
      });
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

  useInterval(() => {
    setTime(time - 1);
  }, timer);

  const location = useLocation();

  return (
    <div className='container-fluid d-flex main p-0 position-relative text-white'>
      <div
        className='modal fade'
        id='breakModal'
        tabIndex='-1'
        aria-labelledby='breakModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content bg-dark text-white'>
            <div className='modal-body modal-text text-center p-0'>
              <div>BREAK</div>
              <div>{matchInfo.red.break ? getTime() : '0:00'}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='position-absolute top-0 header fw-bold fs-3 text-center d-flex flex-column'>
        <div className='border p-2 px-5 bg-dark'>
          <div>
            {location.state.group} - PULA {location.state.pool}
          </div>
          <div>
            RUNDA {location.state.round} - KORT {location.state.court}
          </div>
        </div>
        <div className='bg-dark border mt-4 align-self-center p-2'>
          <div>END 2</div>
        </div>
      </div>
      <div className='position-absolute header mainTimer'>
        <div>0:00</div>
      </div>
      <Player
        playerInfo={{
          club: location.state.club1,
          name: location.state.player1,
        }}
        matchInfo={matchInfo.red}
        setMatchInfo={setMatchInfo}
      />
      <Player
        playerInfo={{
          club: location.state.club2,
          name: location.state.player2,
        }}
        isRightSide={true}
        matchInfo={matchInfo.blue}
        setMatchInfo={setMatchInfo}
      />
    </div>
  );
}
