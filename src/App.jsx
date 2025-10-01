import { useState } from 'react';
import './App.css';
import Control from './Control';
import Dashboard from './Dashboard';
import { Route, Routes, BrowserRouter } from 'react-router';
import Display from './components/Display';

function App() {
  const [isBreak, setBreak] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route
          path='/control/:id'
          element={<Control setBreak={setBreak} isBreak={isBreak} />}
        />
        <Route
          path='/display/:id'
          element={<Display setBreak={setBreak} isBreak={isBreak} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
