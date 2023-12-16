import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainPage from './container/MainPage/MainPage';
import Sidebar from './layout/Sidebar';
import SelectedFileViewer from './container/SelectedFileViewer/SelectedFileViewer';
import SearchSimilarPage from './container/SearchSimilar/SearchSimilarPage';

const App = () => {
  return (
    <>
      <Toaster />
      <Router>
        <Sidebar />
        <div className="pl-16 w-full">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search/:id" element={<SearchSimilarPage />} />
          </Routes>
        </div>
        <SelectedFileViewer />
      </Router>
    </>
  );
};

export default App;
