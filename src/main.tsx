import { App } from '@/app.tsx';
import '@/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Root element with id 'root' not found");
}
createRoot(rootElement).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
