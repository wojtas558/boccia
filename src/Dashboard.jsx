import Match from './components/Match';
import logo from './logo.png';
import './App.css';
import { supabase } from './supabase';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function fetch() {
      const temp = await supabase.from('matches').select();
      setMatches(temp.data);
    }

    fetch();
  }, []);

  return (
    <div className='backgroundGradient container-fluid d-flex flex-column min-vh-100 position-relative text-white'>
      <div className='p-2 bg-dark rounded-5 border border-white border-opacity-25 border-3 rounded-bottom-0 w-100 d-flex align-items-center justify-content-between'>
        <img className='h-100' src={logo} alt='logo akson' />
        <div className='fs-2 fw-semibold'>WYBÓR MECZY</div>
        <button className='btn btn-success me-3'>Stwórz nowy mecz</button>
      </div>
      <div className='p-2 bg-dark rounded-5 border border-white border-3 border-opacity-25 rounded-top-0 border-top-0 d-flex flex-column justify-content-center align-items-center'>
        {matches.map((match) => (
          <Match data={match} />
        ))}
      </div>
    </div>
  );
}
