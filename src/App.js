import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CurriculumForm from './components/CurriculumForm';
import Preview from './components/Preview';
import Home from './components/Home';
import ChooseTemplate from './components/ChooseTemplate';
import Template1Wrapper from './templates/Template1';
import Template2Wrapper from './templates/Template2';
import Template3Wrapper from './templates/Template3';
import { Template4Wrapper, Template5Wrapper } from './templates';
import { AuthProvider } from './context/AuthContext';
import BuyMeACoffee from './components/BuyMeACoffee';
import VersionInfo from './components/VersionInfo';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CurriculumForm />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/choose-template" element={<ChooseTemplate />} />
          <Route path="/template1" element={<Template1Wrapper />} />
          <Route path="/template2" element={<Template2Wrapper />} />
          <Route path="/template3" element={<Template3Wrapper />} />
          <Route path="/template4" element={<Template4Wrapper />} />
          <Route path="/template5" element={<Template5Wrapper />} />
        </Routes>
        <BuyMeACoffee />
        <VersionInfo position="bottomRight" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
