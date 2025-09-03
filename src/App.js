import './App.css';

function App() {
  return (
    <div className='container-fluid d-flex main p-0 position-relative text-white'>
      <div className='position-absolute top-0 header fw-bold fs-3 text-center d-flex flex-column'>
        <div className='border p-2 px-5 bg-dark'>
          <div>BC1 MALE - POOL B</div>
          <div>ROUND 1 - COURT 3</div>
        </div>
        <div className='bg-dark border mt-4 align-self-center p-2'>
          <div>END 2</div>
        </div>
      </div>
      <div className='position-absolute top-50 header align-self-center fw-bold fs-1'>
        <div>0:00</div>
      </div>
      <div className='bg-primary p-0 position-relative'>
        <div className='fs-1 m-4 position-absolute'>
          <div className='d-flex'>
            <div className='bg-white border flag mx-2'>
            </div>
            GRE
          </div>
          <span>2112 Anna</span>
        </div>
        <div className='fs-1 translate-middle position-absolute top-50 start-50'>
          5
        </div>
        <div className='bg-dark position-absolute bottom-0 w-100 border'>
          <div className='d-flex justify-content-center gap-5 py-3'>
            <span className='border rounded-circle d-block'></span>
            <span className='border rounded-circle d-block'></span>
            <span className='border rounded-circle d-block'></span>
            <span className='border rounded-circle d-block'></span>
            <span className='border rounded-circle d-block'></span>
            <span className='border rounded-circle d-block'></span>
          </div>
          <div className='text-center fs-1'> 
            5:00
          </div>
        </div>
      </div>
      <div className='bg-danger p-0 position-relative'>
        <div className='fs-1 m-4 position-absolute'>
          <div className='d-flex'>
            <div className='bg-white border flag mx-2'>
            </div>
            GRE
          </div>
          <span>2112 Anna</span>
        </div>
        <div className='fs-1 translate-middle position-absolute top-50 start-50'>
          5
        </div>
        <div className='bg-dark position-absolute bottom-0 w-100 border'>
          <div className='d-flex justify-content-center gap-5 py-3'>
            <span className='border rounded-circle d-block'></span>
            <span className='border rounded-circle d-block'></span>
            <span className='border rounded-circle d-block'></span>
            <span className='border rounded-circle d-block'></span>
            <span className='border rounded-circle d-block'></span>
            <span className='border rounded-circle d-block'></span>
          </div>
          <div className='text-center fs-1'> 
            5:00
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
