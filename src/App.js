import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CurriculumForm from './components/CurriculumForm';
import Preview from './components/Preview';
import Home from './components/Home';
import ChooseTemplate from './components/ChooseTemplate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CurriculumForm />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/choose-template" element={<ChooseTemplate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
