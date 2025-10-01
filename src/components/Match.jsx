import { NavLink } from 'react-router';

export default function Match({ data }) {
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
            <b>Groupa</b> {data.group} <b>| Pula</b> {data.pool} <b> | Kort</b>{' '}
            {data.court}
          </div>
        )}
      </div>
      <div className='ms-auto border-start border-2 border-white border-opacity-25 p-0 d-flex flex-column'>
        <div className='p-2'>
          <button
            className='btn btn-outline-success'
            onClick={() => {
              document.getElementById('navLinkControl').click();
              document.getElementById('navLinkDisplay').click();
            }}
          >
            Uruchom
          </button>
        </div>
        <hr className='m-0 border-2' />
        <div className='p-2'>
          <NavLink
            id='navLinkDisplay'
            target={'_blank'}
            rel='noopener noreferrer'
            to={'display/' + data.id}
            className='btn btn-outline-info me-3 my-auto'
          >
            Wyświetlanie
          </NavLink>
          <NavLink
            id='navLinkControl'
            target={''}
            rel='noopener noreferrer'
            to={'control/' + data.id}
            className='btn btn-outline-warning my-auto'
          >
            Zarządzanie
          </NavLink>
        </div>
      </div>
    </div>
  );
}
