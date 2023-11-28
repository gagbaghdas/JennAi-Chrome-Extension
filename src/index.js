import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a new div container
const extensionContainer = document.createElement('div');
extensionContainer.id = 'my-extension-root';
document.body.appendChild(extensionContainer); // Appending to the end of body

const extensionRoot = document.getElementById('my-extension-root');
if (extensionRoot) {
    // Render the React app inside the new container
    const root = ReactDOM.createRoot(extensionContainer);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    // Your other logic for non-extension contexts
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

reportWebVitals();
