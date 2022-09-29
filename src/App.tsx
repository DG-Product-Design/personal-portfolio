import React from 'react';
import { useSetRecoilState } from 'recoil';
import * as AppState from './AppState';
import { Routes, Route } from "react-router-dom";
import smoothscroll from 'smoothscroll-polyfill';
import Nav from './Nav/Nav';
import HomePage from './pages/Homepage/HomePage';
import Footer from './Footer/Footer';
import Error404Page from './pages/404';


import './App.scss';

function App() {
  const setScreenBelowLg = useSetRecoilState(AppState.screenBelowLg);
  const setScreenBelowSm = useSetRecoilState(AppState.screenBelowSm);

  smoothscroll.polyfill();

  function handleWindowSize() {
    let windowWidth = window.innerWidth;
    setScreenBelowLg(windowWidth < 992);
    setScreenBelowSm(windowWidth < 576);
  }

  React.useEffect(() => {
    handleWindowSize();
    window.addEventListener('resize', handleWindowSize, { passive: true });
    return () => window.removeEventListener('resize', handleWindowSize);
  });
  
  return (
    <div id="app" className="app-wrapper">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
