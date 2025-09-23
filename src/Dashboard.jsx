import Match from './components/Match';

export default function Dashboard() {
  const matches = [1, 2, 3, 4];

  return (
    <div className='backgroundGradient container-fluid d-flex flex-column min-vh-100 position-relative'>
      <div className='p-2 bg-white rounded-5 border border-black border-5 rounded-bottom-0 w-100 d-flex'>
        <div>a</div>
        <button className='btn btn-success ms-auto fw-bold me-3'>
          Create Match
        </button>
      </div>
      <div className='p-2 bg-white rounded-5 border border-black border-5 rounded-top-0 border-top-0 d-flex flex-column justify-content-center align-items-center'>
        {matches.map((match) => (
          <Match data={match} />
        ))}
      </div>
    </div>
  );
}
