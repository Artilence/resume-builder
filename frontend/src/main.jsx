import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import { MyProvider } from './context/myContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <MyProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </MyProvider>,
);
