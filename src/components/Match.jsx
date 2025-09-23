import { useNavigate } from 'react-router';

export default function Match({ data }) {
  const navigate = useNavigate();

  return (
    <div className='border border-white border-opacity-25 border-2 my-2 rounded d-flex match text-center'>
      {/* <div className='border-end border-2 border-white border-opacity-25 d-flex align-items-center'>
        <b>{data.id}</b>
      </div> */}
      <div className='px-0'>
        <div className='px-3'>
          <div>
            {data.player1} <b>VS</b> {data.player2}
          </div>
          <div>
            {data.club1} <b>VS</b> {data.club2}
          </div>
        </div>
        {!data.group || !data.pool || !data.court ? (
          ''
        ) : (
          <div className='px-3 border-top border-2 border-white border-opacity-25'>
            {data.group} - {data.pool} | {data.court}
          </div>
        )}
      </div>
      <div className='ms-auto border-start border-2 border-white border-opacity-25 d-flex'>
        <button
          className='btn btn-outline-info me-3'
          onClick={() => {
            navigate('display');
          }}
        >
          Wyświetlanie
        </button>
        <button
          className='btn btn-outline-warning'
          onClick={() => {
            navigate('control', { state: data });
          }}
        >
          Zarządzanie
        </button>
      </div>
    </div>
  );
}
