import React from 'react';
import { useRecoilValue } from 'recoil';
import * as AppState from '../../AppState';
import './Nav.scss';


function scrollIntoView(id: string) {
  const yOffset = -78; 
  const target = document.getElementById(id);;
  const y = target ? target.getBoundingClientRect().top + window.pageYOffset + yOffset : 72;
  window.scrollTo({top: y, behavior: 'smooth'});
}

const Nav = () => {
  const PDF = process.env.PUBLIC_URL + '/download/David-A-George-Resume.pdf';

  const screenBelowSm = useRecoilValue(AppState.screenBelowSm);

  return (
    <nav className="w-100 px-2 px-lg-5 py-3">
      <div className="d-flex w-100 container-lg align-items-center justify-content-between">
        <h1 className="nav__headline text--gradient link link-blue-300 fs-4 mb-0" onClick={() => scrollIntoView('homepage')}>
          { screenBelowSm ? 'DG.' : 'David A. George' }
        </h1>
        <div>
          <span className="nav__nav-link link ms-2 ms-sm-3" onClick={() => scrollIntoView('work')}>Work</span>
          <a href={PDF} className="nav__nav-link link ms-2 ms-sm-3" rel='noopener noreferrer' target="_blank" download>Resume</a>

          <button className="dg-btn bg-gradient-green-200 py-2 px-3 ms-2 ms-sm-3" onClick={() => {}}>
            Let's chat
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav;