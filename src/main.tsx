import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { setupOTelSDK } from "./instrumentation.ts";
import './index.css';

if (!import.meta.env.DEV) {
    setupOTelSDK();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
