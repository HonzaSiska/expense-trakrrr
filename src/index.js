import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// styles
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <LanguageProvider> */}
      <AuthContextProvider>
        <App />
      </AuthContextProvider>  
    {/* </LanguageProvider>  */}
  </React.StrictMode>
);


