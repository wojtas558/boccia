export default function Match({ data }) {
  return (
    <div className='border border-black border-2 my-2 rounded d-flex match text-center'>
      {/* <div className='border-end border-2 border-black py-auto'>ID: {data}</div> */}
      <div className='px-0'>
        <div className='px-3 border-bottom border-2 border-black'>
          AAAAA BBBBB CCCCC vs AAAAA BBBBB CCCCC
        </div>
        <div className='px-3'>PULA B - RUNDA 1 - KORT 3 </div>
      </div>
      <div className='ms-auto border-start border-2 border-black d-flex'>
        <button className='btn btn-outline-primary me-3'>Display</button>
        <button className='btn btn-outline-warning'>Control</button>
      </div>
    </div>
  );
}
