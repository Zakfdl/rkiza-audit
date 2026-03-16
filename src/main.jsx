// src/main.jsx
// Entry point — used by the build script (scripts/build.js)
// This file documents the app entry for documentation purposes.
// The build script inlines all modules and uses esbuild directly.
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App, null));
