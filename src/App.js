import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CurriculumForm from './components/CurriculumForm';
import CurriculumFormV2 from './components/CurriculumFormV2';
import Preview from './components/Preview';
import HomeFixed from './components/Home_fixed';
import HomeV2 from './components/HomeV2';
import ChooseTemplate from './components/ChooseTemplate';
import Template1Wrapper from './templates/Template1';
import Template2Wrapper from './templates/Template2';
import Template3Wrapper from './templates/Template3';
import { Template4Wrapper, Template5Wrapper } from './templates';
import { AuthProvider } from './context/AuthContext';
import BuyMeACoffee from './components/BuyMeACoffee';
import VersionInfo from './components/VersionInfo';
import TestGenerator from './components/TestGenerator';
import TestPDFComparison from './components/TestPDFComparison';

function App() {
  const router = createBrowserRouter(
    [
      { path: '/', element: <HomeV2 /> },
      { path: '/test-generator', element: <TestGenerator /> },
      { path: '/test-pdf', element: <TestPDFComparison /> },
      { path: '/home-classic', element: <HomeFixed /> },
      { path: '/create', element: <CurriculumFormV2 /> },
      { path: '/create-classic', element: <CurriculumForm /> },
      { path: '/preview', element: <Preview /> },
      { path: '/choose-template', element: <ChooseTemplate /> },
      { path: '/template1', element: <Template1Wrapper /> },
      { path: '/template2', element: <Template2Wrapper /> },
      { path: '/template3', element: <Template3Wrapper /> },
      { path: '/template4', element: <Template4Wrapper /> },
      { path: '/template5', element: <Template5Wrapper /> },
    ],
    {
      // Opt-in antecipado para o comportamento da v7
      future: { 
        v7_relativeSplatPath: true,
        v7_startTransition: true 
      },
    }
  );

  return (
    <AuthProvider>
      {/* RouterProvider fornece o contexto de rotas (substitui BrowserRouter) */}
      <RouterProvider router={router} />
      <BuyMeACoffee />
      <VersionInfo position="bottomRight" />
    </AuthProvider>
  );
}

export default App;
