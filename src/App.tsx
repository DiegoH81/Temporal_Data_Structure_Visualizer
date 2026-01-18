import './App.css'
import {Routes, Route, useLocation, Navigate} from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/AboutUs';

import NavBar from './components/NavBar';

function App() {
  const location = useLocation();

  return (
    <>
      <NavBar />

      <main className='app-content'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />}/>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<About/>} />
          <Route path="/menu" element={<Home />} />
        </Routes>
      </main>
    </>
  )
}

export default App
