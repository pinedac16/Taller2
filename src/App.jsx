import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import GameProvider from './context/GameProvider';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';


const App = () => {

  const title = "TALLER 2 - CARDS GAME";
  return (
    <GameProvider>
      <BrowserRouter>
        <Header title={title}/>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/game' element={<GamePage />}/>
        </Routes>
      </BrowserRouter>
    </GameProvider>
  )
}

export default App