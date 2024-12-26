import { Route, Routes } from 'react-router';
import './App.css';
import Demotemplate from './components/Demotemplate';
import Homepage from './Homepage';
import PreviewResume from './pages/previewResume';
import SelectProfile from './pages/SelectProfile';
import CreateProfile from './pages/CreateProfile';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/linkedin/callback" element={<Homepage />} />
        <Route path="/demotemplate" element={<Demotemplate />} />
        <Route path="/previewresume" element={<PreviewResume />} />
        <Route path="/selectprofile" element={<SelectProfile />} />
        <Route path="/createprofile" element={<CreateProfile />} />
      </Routes>
    </>
  );
}

export default App;
