import Match from './components/Match';
import logo from './logo.png';
import './App.css';

export default function Dashboard() {
  const matches = [1, 2, 3, 4];

  return (
    <div className='backgroundGradient container-fluid d-flex flex-column min-vh-100 position-relative text-white'>
      <div className='p-2 bg-dark rounded-5 border border-white border-opacity-25 border-2 rounded-bottom-0 w-100 d-flex'>
        <div>
          <img className='w-100 h-100' src={logo} alt='logo akson' />
        </div>
        <button className='btn btn-success ms-auto me-3'>
          Stwórz nowy mecz
        </button>
      </div>
      <div className='p-2 bg-dark rounded-5 border border-white border-2 border-opacity-25 rounded-top-0 border-top-0 d-flex flex-column justify-content-center align-items-center'>
        {matches.map((match) => (
          <Match data={match} />
        ))}
      </div>
    </div>
  );
}
