import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EditPage from './pages/edit';
import MainPage from './pages/main';
import ResultPage from './pages/result';
import SongpyeonPage from './pages/songpyeon';
import './transition.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={<MainPage />}
          path='/'
        />
        <Route
          element={<EditPage />}
          path='/edit'
        />
        <Route
          element={<ResultPage />}
          path='/result/:id/:sender'
        />
        <Route
          element={<SongpyeonPage />}
          path='/songpyeon/:id'
        />
      </Routes>
    </Router>
  );
}

export default App;
