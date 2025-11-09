import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
  const router = createBrowserRouter(
    [
      { path: '/', element: <Home /> },
      { path: '/create', element: <CurriculumForm /> },
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
