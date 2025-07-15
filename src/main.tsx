import { App } from '@/app.tsx';
import { globalStyles } from '@/global.styles';
import { ThemeProvider } from '@/theme/theme-provider';
import { Global } from '@emotion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Root element with id 'root' not found");
}
createRoot(rootElement).render(
    <StrictMode>
        <Global styles={globalStyles} />
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </StrictMode>,
);
