import './App.css'
import {Routes, Route, useLocation, Navigate} from 'react-router-dom';
import Home from './pages/Home'

function App() {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
