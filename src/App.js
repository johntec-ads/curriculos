import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CurriculumForm from './components/CurriculumForm';
import Preview from './components/Preview';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CurriculumForm />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
