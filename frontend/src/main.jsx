import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import { MyProvider } from './context/myContext.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <MyProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MyProvider>
    </Provider>
  </StrictMode>
);
