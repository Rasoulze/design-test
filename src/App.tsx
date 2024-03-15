import './App.scss';
import { Container } from 'react-bootstrap';
import Body from "./body/Body";
import MenuBar from "./nav-bar/MenuBar";
function App() {
  return (
    <Container className='position-relative p-2 p-lg-3 p-xl-4 p-xxl-5 background-panel' fluid>
      <div className='position-absolute top-0 end-0 slider-panel'>
        <svg width="614" height="860" viewBox="0 0 614 860" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M109.371 0H614V860H100.669C39.3433 860 -7.53485 755.308 1.84529 694.704L109.371 0Z" fill="#FFC839" />
        </svg>
        <div className='position-absolute w-100 burger-panel'>
          <div className='position-relative'>
            <div className='position-absolute back-burger'>
              <img src='burger2.png' />
            </div>
            <div className='position-absolute front-burger'>
              <img src='burger1.png' />
            </div>
          </div>
        </div>
        <div className='position-absolute hand-like'>
          <img className='position-relative' src='hand.png' />
        </div>
        <div className='position-absolute slider-menu'>
          <div className='d-flex justify-content-end'>
            <a>Applications</a>
            <a>Privacy</a>
            <a>Terms</a>
          </div>
        </div>
      </div>
      <div className='w-100 h-100 front-panel'>
        <Container className='px-xxl-5 py-4' fluid>
          <MenuBar />
          <Body />
        </Container>
      </div>
    </Container>
  );
}
export default App;

