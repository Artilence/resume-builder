import { Route, Routes } from 'react-router';
import './App.css';
import Demotemplate from './components/Demotemplate';
import Homepage from './Homepage';
import CreateYourResume from './pages/CreateYourResume';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/linkedin/callback" element={<Homepage />} />
        <Route path="/demotemplate" element={<Demotemplate />} />
        <Route path="/createyourresume" element={<CreateYourResume />} />
      </Routes>
    </>
  );
}

export default App;
