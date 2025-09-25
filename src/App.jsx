import { useState } from 'react';
import './App.css';
import Control from './Control';
import Dashboard from './Dashboard';
import { HashRouter, Route, Routes } from 'react-router';
import Display from './components/Display';

function App() {
  const [isBreak, setBreak] = useState(false);

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route
          path='/control'
          element={<Control setBreak={setBreak} isBreak={isBreak} />}
        />
        <Route
          path='/display'
          element={<Display setBreak={setBreak} isBreak={isBreak} />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
