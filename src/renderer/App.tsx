import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './container/MainPage/MainPage';
import Sidebar from './layout/Sidebar';
import Drawer from './layout/Drawer';
import SelectedFileViewer from './container/SelectedFileViewer/SelectedFileViewer';

const App = () => {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/history" element={<></>} />
      </Routes>
      <SelectedFileViewer />
    </Router>
  );
};

export default App;
