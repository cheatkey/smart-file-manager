import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddFilesPage from './container/AddFiles/AddFilesPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddFilesPage />} />
      </Routes>
    </Router>
  );
}
