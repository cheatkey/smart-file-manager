import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainPage from './container/MainPage/MainPage';
import Sidebar from './layout/Sidebar';
import SelectedFileViewer from './container/SelectedFileViewer/SelectedFileViewer';
import SearchSimilarPage from './container/Search/SearchSimilar/SearchSimilarPage';
import SearchTagFilesPage from './container/Search/SearchTag/SearchTagFilesPage';
import SearchTagSimilarPage from './container/Search/SearchTagSimilar/SearchTagSimilarPage';
import SearchSimilarMemo from './container/Search/SearchSimilarMemo/SearchSimilarMemo';
import SearchPage from './container/Search/SearchPage';

const App = () => {
  return (
    <>
      <Toaster />
      <Router>
        <Sidebar />
        <div className="pl-16 w-full">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />

            <Route path="/search/:id" element={<SearchSimilarPage />} />
            <Route
              path="/search-tag/:tagName"
              element={<SearchTagFilesPage />}
            />
            <Route
              path="/search-tag-similar/:id"
              element={<SearchTagSimilarPage />}
            />
            <Route path="/search-memo/:id" element={<SearchSimilarMemo />} />
          </Routes>
        </div>
        <SelectedFileViewer />
      </Router>
    </>
  );
};

export default App;
