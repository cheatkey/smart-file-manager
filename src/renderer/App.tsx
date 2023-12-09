import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './container/MainPage/MainPage';
import Sidebar from './layout/Sidebar';

const App = () => {
  return (
    <>
      <Sidebar />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
