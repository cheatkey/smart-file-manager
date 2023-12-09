import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './container/MainPage/MainPage';
import Sidebar from './layout/Sidebar';

const App = () => {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/history" element={<p>히ㅡㅌ리</p>} />
      </Routes>
    </Router>
  );
};

export default App;
