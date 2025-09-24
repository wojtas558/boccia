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
        <div
          className='modal hide fade in'
          id='formModal'
          tabIndex='-1'
          // aria-labelledby='exampleModalLabel'
          // aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content bg-dark text-white'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='exampleModalLabel'>
                  Nowy mecz
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-theme='dark'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                <form className='d-flex flex-column gap-3 p-2'>
                  <div>
                    Gracz 1
                    <div className='form-floating'>
                      <input
                        placeholder=''
                        type='text'
                        name='player1'
                        id='player1'
                        className='form-control'
                      />
                      <label htmlFor='player1'>Imie i nazwisko</label>
                    </div>
                    <div className='form-floating'>
                      <input
                        placeholder=''
                        type='text'
                        name='club1'
                        id='club1'
                        className='form-control'
                      />
                      <label htmlFor='club1'>Klub</label>
                    </div>
                  </div>
                  <div>
                    Gracz 2
                    <div className='form-floating'>
                      <input
                        placeholder=''
                        type='text'
                        name='player2'
                        id='player2'
                        className='form-control'
                      />
                      <label htmlFor='player2'>Imie i nazwisko</label>
                    </div>
                    <div className='form-floating'>
                      <input
                        placeholder=''
                        type='text'
                        name='club2'
                        id='club2'
                        className='form-control'
                      />
                      <label htmlFor='club2'>Klub</label>
                    </div>
                  </div>
                </form>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Zamknij
                </button>
                <button
                  type='button'
                  className='btn btn-success'
                  onClick={async (e) => {
                    await supabase.from('matches').insert({
                      player1: document.getElementById('player1').value,
                      player2: document.getElementById('player2').value,
                      club1: document.getElementById('club1').value,
                      club2: document.getElementById('club2').value,
                    });
                    console.log(document.getElementById('player1').value);
                  }}
                >
                  Zapisz
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className='btn btn-success me-3'
          data-bs-toggle='modal'
          data-bs-target='#formModal'
        >
          Stwórz nowy mecz
        </button>
      </div>
      <div className='p-2 bg-dark rounded-5 border border-white border-3 border-opacity-25 rounded-top-0 border-top-0 d-flex flex-column justify-content-center align-items-center'>
        {matches.map((match) => (
          <Match data={match} />
        ))}
      </div>
    </div>
  );
}
