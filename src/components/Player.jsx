import Ball from './Ball';

export default function Player({
  playerInfo,
  matchInfo,
  isRightSide,
  switchColors,
  setMatchInfo,
}) {
  const maxPoints = 6;

  function getColor() {
    if (isRightSide) return switchColors ? 'redPlayer' : 'bluePlayer';
    else return switchColors ? 'bluePlayer' : 'redPlayer';
  }

  function showPoints() {
    const points = [];
    for (let i = 0; i < maxPoints; i++) {
      points.push(
        <Ball
          key={i}
          onClick={() => setMatchInfo({ points: (matchInfo.points + 1) % 7 })}
          scored={maxPoints - matchInfo.points <= i}
          getColor={getColor}
        />,
      );
    }

    return points;
  }

  return (
    <div
      className={
        'p-0 position-relative ' +
        (isRightSide ? 'rightSide ' : '') +
        getColor(isRightSide)
      }
    >
      <div className='fs-1 m-2 position-absolute'>
        <div className='d-flex'>
          <div
            className={
              'bg-white border flag ' + (isRightSide ? 'ms-2' : 'me-2')
            }
          ></div>
          {playerInfo.club}
        </div>
        <span>{playerInfo.name}</span>
      </div>
      <div className='translate-middle position-absolute top-40 start-50 points'>
        {matchInfo.points}
      </div>
      <div className='bg-dark position-absolute bottom-0 w-100'>
        <div className='border'>
          <div className='d-flex justify-content-between p-3 pb-0'>
            {showPoints()}
          </div>
          <div className='text-center playerTimer lh-sm'>5:00</div>
        </div>
        <div
          className={
            'p-2 d-flex gap-2 justify-content-end border ' +
            (isRightSide ? 'border-start-0 ps-1' : 'border-end-0 pe-1') +
            (matchInfo.points === 6 ? ' test' : '')
          }
        >
          {(() => {
            const points = [];

            for (let i = 0; i < maxPoints; i++) {
              if (maxPoints - matchInfo.points > i)
                points.push(
                  <Ball
                    height={40}
                    key={i}
                    scored={true}
                    getColor={getColor}
                  />,
                );
            }
            return points;
          })()}
        </div>
      </div>
    </div>
  );
}
