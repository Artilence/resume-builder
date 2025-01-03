import { Route, Routes } from 'react-router';
import './App.css';
import Homepage from './pages/Homepage';
import DemoTemplate from './components/DemoTemplate';
import PreviewResume from './pages/PreviewResume';
import SelectProfile from './pages/SelectProfile';
import CreateProfile from './pages/CreateProfile';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/linkedin/callback" element={<Homepage />} /> */}
        <Route path="/demo-template" element={<DemoTemplate />} />
        <Route
          path="/preview-resume"
          element={<ProtectedRoute element={PreviewResume} />}
        />
        <Route path="/selectprofile" element={<SelectProfile />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
