import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainPage from './container/MainPage/MainPage';
import Sidebar from './layout/Sidebar';
import SelectedFileViewer from './container/SelectedFileViewer/SelectedFileViewer';

const App = () => {
  return (
    <>
      <Toaster />
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/history" element={<></>} />
        </Routes>
        <SelectedFileViewer />
      </Router>
    </>
  );
};

export default App;
