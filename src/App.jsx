import { useState } from 'react';
import './App.css';
import Player from './components/Player';
import Control from './Control';
import { HashRouter, Route, Routes } from 'react-router';

function App() {
  const player = {
    club: 'KLUB (DŁUGA NAZWA)',
    name: 'AAAAA BBBBB',
  };

  const [matchInfo, setMatchInfo] = useState({
    points: 4,
  });

  return (
    <HashRouter>
      <Routes>
        <Route
          path='/'
          element={
            <div className='container-fluid d-flex main p-0 position-relative text-white'>
              <div className='position-absolute top-0 header fw-bold fs-3 text-center d-flex flex-column'>
                <div className='border p-2 px-5 bg-dark'>
                  <div>BC1 MĘŻCZYŹNI - PULA B</div>
                  <div>RUNDA 1 - KORT 3</div>
                </div>
                <div className='bg-dark border mt-4 align-self-center p-2'>
                  <div>END 2</div>
                </div>
              </div>
              <div className='position-absolute header mainTimer'>
                <div>0:00</div>
              </div>
              <Player
                playerInfo={player}
                matchInfo={matchInfo}
                setMatchInfo={setMatchInfo}
              />
              <Player
                playerInfo={player}
                isRightSide={true}
                matchInfo={matchInfo}
                setMatchInfo={setMatchInfo}
              />
            </div>
          }
        />
        <Route path='/control' element={<Control />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
